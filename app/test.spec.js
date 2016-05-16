'use strict';

describe('test -> ', function() {
    beforeEach(module('widgetModule'));

    var $controller, $scope, controller;

    beforeEach(inject(function(
        _$controller_
        // _$injector_

    ){
        $controller = _$controller_;
        // $injector = _$injector_;
        $scope = {};
        
        controller = (function() {
            return  $controller(WidgetController); //$injector.invoke(WidgetController);
        })();

    }));


    describe('check necessary params ->', function() {
        
        describe('check defined params ->', function() {
            it('WidgetController has to have errorMessage param ->', inject(function() {
                expect(controller.errorMessage).toBeDefined();
            }));

            it('WidgetController has to have nameSubmit method ->', inject(function() {
                expect(controller.nameSubmit).toBeDefined();
            }));

            it('WidgetController has to have editWidgetCta method ->', inject(function() {
                expect(controller.editWidgetCta).toBeDefined();
            }));

            it('WidgetController has to have deleteConfirmCta method ->', inject(function() {
                expect(controller.deleteConfirmCta).toBeDefined();
            }));
        });


        describe('check WidgetController.nameSubmit method ->', function() {

            it('no change in name ->', inject(function() {
                controller.boardId = '42';
                controller.widgetNameEditable = null;
                controller.propert = { widgetId: '24'};
                controller.nameField = 'testNameField';

                controller.detail = { name: 'testNameField' };
                controller.nameSubmit();
                
                expect(controller.widgetNameEditable).toBe(false);
                expect(controller.errorMessage.duplicate).toBe(false);
            }));

            it('name changed ->', inject(function() {
                controller.boardId = '42';
                controller.widgetNameEditable = null;
                controller.propert = { widgetId: '24'};
                controller.nameField = 'testNameField';

                controller.widgetNameEditable = null;
                controller.detail = { name: 'testNameFieldChanged' };
                controller.nameSubmit();
                
                expect(controller.widgetNameEditable).toBe(null);
                expect(controller.errorMessage.duplicate).toBe(true);
            }));

        });

        describe('check WidgetController.editWidgetCta method ->', function() {
            it('window.screenTop has to equals to 0 ->', inject(function() {
                controller.property = { widgetTypeId: ''};
                controller.detail = '';
                
                controller.editWidgetCta();
                expect(window.screenTop).toBe(0);
            }));
        });

    });
});
