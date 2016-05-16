'use strict';

var widgetModule = angular.module('widgetModule',
  [
    'chartsModule',
    'widgetDeleteConfirmModule'
  ]
);


widgetModule.directive('widget', [function(){
  return {
    restrict: 'A',
    templateUrl: './components/widget/widget.html',
    scope: {
      'property'      : '=',
      'detail'        : '=',
      'widgetDetail'  : '=',
      'widgetLayout'  : '=',
      'boardId'       : '@'
    },
    controller: WidgetController,
    controllerAs: 'widgetVm',
    bindToController: true // this will enable controllerAs syntax for IsolateScope
  }
}]);

var WidgetController = [
                        'boardService',
                        'widgetService',
                        'widgetApi',
                        'globalMessagesService',
                        '$uibModal',
                        'wizardContainerService',
              function (
                        boardService,
                        widgetService,
                        widgetApi,
                        gmService,
                        $uibModal,
                        wizardContainerService
                       ){

  var widgetVm = this;
  widgetVm.errorMessage = {}
  widgetVm.errorMessage.duplicate = false;



  widgetVm.nameSubmit = function(){
    widgetVm.boardId = parseInt(widgetVm.boardId);
    // if non null name
    if(widgetVm.nameField != null){

      var allWidgetNames = boardService.getWidgetNameListInBoard(widgetVm.boardId);
      var widgetNameDuplicate = isWidgetNameDuplicate(widgetVm.nameField, allWidgetNames);
     
      // no change in name
      if(angular.equals(widgetVm.nameField, widgetVm.detail.name)){
        widgetVm.widgetNameEditable = false;
      
      // name changed
      }else{

        // if name valid and not duplicate
        if(!widgetNameDuplicate){
          callWidgetUpdateApi(widgetVm.property.widgetId, widgetVm.nameField, widgetVm.boardId);
        }else{
          widgetVm.errorMessage.duplicate = true;
        }

      }

    }
  };
  


  widgetVm.editWidgetCta = function(){
    // wizardContainerService.toggleView();
    //
    wizardContainerService.openWizard(widgetVm.property.widgetTypeId, widgetVm.detail);
    //widgetService.editScrollY = window.scrollY;
    widgetService.editScrollY = window.pageYOffset;
    window.scrollTo(0,0);
  };
  


  // integrate it
  function callWidgetUpdateApi(widgetId, widgetName, dashboardId){
    widgetApi.update({
      WidgetId  : widgetId,
      Name      : widgetName,
      ActionMethod : 'NameSave',
      WidgetTypeId: widgetVm.property.widgetTypeId,
      ChartTypeId: widgetVm.property.chartTypeId,
      CharTypeId: widgetVm.property.chartTypeId, // TYPO ON API SIDE, MISSPELLED CHARTYPE

      Description: 'description',
      DashboardWidget : {  
        DashboardId   : dashboardId
      }
    })
      .$promise.then(function(data){
        widgetVm.detail.name = widgetVm.nameField;
        widgetVm.widgetNameEditable = false;

      }, function(error){
        gmService.addMessage("An error occured while renaming widget. Please try again.", 'error');
        widgetVm.widgetNameEditable = false;
      
      });
  }


  function isWidgetNameDuplicate(widgetName, allWidgetNames){
    var duplicate = true;

    allWidgetNames.every(function(item){

      // is duplicate
      if(widgetName.toString().toLowerCase() === item.toLowerCase()){
        duplicate = true;
        return false; // end loop
      
      // is not duplicate
      }else{
        duplicate = false;
        return true; // continue loop
      }

    });

    return duplicate;
  }


  // delete widget
  widgetVm.deleteConfirmCta = function() {
    deleteModalOpen();
  }


  function deleteModalOpen(size) {
    // Create Delete Wizard Modal Instance and open it;
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './components/widget/widget-delete-confirm/widget-delete-confirm.html',
      controller: 'WidgetDeleteConfirmController',
      controllerAs: 'vm',
      resolve: {
        widgetName: function() {
          return widgetVm.detail.name;
        }
      }
    });

    modalInstance.result
      // When modal okayed, do this
      .then(function() {

        callWidgetDeleteApi(widgetVm.property.widgetId, widgetVm.boardId);

      // when modal canceled, or closed
      }, function() {

        console.log('Modal dismissed at: ' + new Date());

      });
  }


  function callWidgetDeleteApi(widgetId, boardId){
    widgetId  = parseInt(widgetId);
    boardId   = parseInt(boardId);


    widgetService.deleteWidgetApi(widgetId, boardId, widgetDeleteSuccess, widgetDeleteError);
  }


  function widgetDeleteSuccess(widgetId, boardId){
    boardService.deleteWidget(widgetId, boardId);
  }


  function widgetDeleteError(){
    console.log('Widget Delete Error');
  }



}];