/// <reference path="..\..\..\Scripts\typings\angularjs\angular.d.ts" />

angular.module('app', [
    'templates-app',
    'templates-common',
    'app.main',
    'ngRoute', // angular-route.js
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
})


//.run(function run(titleService) {
//    titleService.setSuffix(' | ngBoilerplate');
//})


.controller('AppCtrl', function AppCtrl($scope, $location) {
})
;

