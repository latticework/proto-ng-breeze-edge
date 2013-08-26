/// <reference path=".\mainreferences.ts" />

module MainControllers {
};

angular.module('App.Main', [
    'ngRoute', // angular-route.js
])

    .config(function myAppConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                controller: 'MainHomeCtrl',
                templateUrl: 'app/main/home/home.tpl.html',
            })
            .when('/about', {
                controller: 'MainAboutCtrl',
                templateUrl: 'app/main/about/about.tpl.html',
            })
            .otherwise({ redirectTo: '/home' });
    })


    .controller(MainControllers)
;

