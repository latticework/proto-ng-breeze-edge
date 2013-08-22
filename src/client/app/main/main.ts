/// <reference path="..\..\..\..\Scripts\typings\angularjs\angular.d.ts" />

angular.module('app.main', [
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


.controller('MainCtrl', function MainCtrl($scope, $location) {
})
;

