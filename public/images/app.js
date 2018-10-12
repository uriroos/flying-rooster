// Workaround to make defining and retrieving angular modules easier and more intuitive.
(function (angular) {
    var origMethod = angular.module;

    var alreadyRegistered = {};

    angular.module = function (name, reqs, configFn) {
        reqs = reqs || [];
        var module = null;

        if (alreadyRegistered[name]) {
            module = origMethod(name);
            module.requires.push.apply(module.requires, reqs);
        } else {
            module = origMethod(name, reqs, configFn);
            alreadyRegistered[name] = module;
        }

        return module;
    };

})(angular);

// Angular Module | BrandBox
(function () {

    "use strict";

    angular.module('BrandBox', ['app.services.environment', 'ngMaterial', 'app.controls'])
    
        .controller('BBCtrl', function($window, $rootScope, $timeout, EnvironmentService, $scope) {
            
            // Private
            var self = this;
            
            EnvironmentService.ActiveId = null;
            
            // Set Environment Mode
            this.init = function(mode) {
                
                // Only care about edit
                if(mode !== 'edit' && mode !== 'publish' && mode !== 'layout') return;

                $scope.mode = mode;
                self.mode = mode;
                
                // Set Environment Mode
                EnvironmentService.Mode = mode;

                // Set Environment Parent
                EnvironmentService.init($window.parent.angular.element($window.frameElement).isolateScope());
            };
            
        })
    
        // Config
        .config(['$httpProvider', function($httpProvider) {

            // Config goes here... 
            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            
        }])
        
        // Run
        .run(function () {
            // One line to rule them all...
            // or to disable angular form watchers.
            $('form').attr('ng-non-bindable', '');
        });
})();