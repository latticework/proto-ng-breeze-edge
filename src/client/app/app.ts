/// <reference path=".\appreferences.ts" />

module app {
    'use strict';

    var app = angular.module('app', [
        'ngRoute', // angular-route.js
        'templates-app',
        'templates-common',
        'app.main',
        'app.todo',
    ])

        .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        })


    //.run(function run(titleService) {
    //    titleService.setSuffix(' | ngBoilerplate');
    //})


        .controller('AppCtrl', function AppCtrl($scope, $location) {
        })
    ;
}

