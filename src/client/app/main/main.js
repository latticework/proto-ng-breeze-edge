/// <reference path=".\mainreferences.ts" />
;

angular.module('App.Main', [
    'ngRoute'
]).config(function myMainConfig($routeProvider) {
    $routeProvider.when('/home', {
        controller: 'MainHomeCtrl',
        templateUrl: 'app/main/home/home.tpl.html'
    }).when('/about', {
        controller: 'MainAboutCtrl',
        templateUrl: 'app/main/about/about.tpl.html'
    }).otherwise({ redirectTo: '/home' });
}).controller(MainControllers);
//# sourceMappingURL=main.js.map
