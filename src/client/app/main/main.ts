/// <reference path=".\mainreferences.ts" />

module MainControllers {
};

angular.module('app.main', [
    'ngRoute', // angular-route.js
    'app.main.home',
    'app.main.about',
])

    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('/home', {
                controller: 'MainHomeCtrl',
                templateUrl: '/app/main/home.tpl.html',
            })
            .when('/about', {
                controller: 'MainAboutCtrl',
                templateUrl: '/app/main/about.tpl.html',
            })
            .otherwise('/home');
    })


    .controller(MainControllers)
;

