/// <reference path=".\appreferences.ts" />

module app {
    'use strict';

    var app = angular.module('App', [
        'ngRoute', // angular-route.js
        'templates-app',
        'templates-common',
        'App.Main',
        'App.Todo',
    ])

        .config(function myAppConfig($routeProvider) {
        })


    //.run(function run(titleService) {
    //    titleService.setSuffix(' | ngBoilerplate');
    //})


        .controller('AppCtrl', function AppCtrl($scope, $location) {
        })
    ;
}

