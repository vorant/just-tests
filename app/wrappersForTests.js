'use strict';

angular.module('chartsModule', []);

angular.module('widgetDeleteConfirmModule', [])
    .factory('boardService',           function boardService() { 
        var self = this;
        
        self.getWidgetNameListInBoard = function getWidgetNameListInBoard() {
            return ['testNameField'];   
        };
        
        return self;
    })
    .factory('widgetService',          function widgetService() { return {}})
    .factory('widgetApi',              function widgetApi() { return {}})
    .factory('globalMessagesService',  function globalMessagesService() { return {}})
    .factory('$uibModal',              function uibModal() { return {}})
    .factory('wizardContainerService', function wizardContainerService() {
        var self = this;

        self.openWizard = function openWizard(a, b) {};

        return self;
    })
;