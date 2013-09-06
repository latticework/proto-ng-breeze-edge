/// <reference path=".\appreferences.ts" />
var app;
(function (app) {
    'use strict';

    var app = angular.module('App', [
        'ngRoute',
        'templates-app',
        'templates-common',
        'App.Main',
        'App.Todo'
    ]).config(function myAppConfig($routeProvider) {
    }).controller('AppCtrl', function AppCtrl($scope, $location) {
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map
