/// <reference path=".\todoreferences.ts" />

angular.module('App.Todo', [
    'ngRoute', // angular-route.js
])

    .config(function myAppConfig($routeProvider) {
        $routeProvider
            .when('/todo', {
                controller: 'TodoTodoListCtrl',
                templateUrl: 'app/todo/todolist/todolist.tpl.html',
            })
            .when('/todo/:todoId', {
                controller: 'TodoTodoDetailsCtrl',
                templateUrl: 'app/todo/tododetails/tododetails.tpl.html',
            });
    })


    .controller('TodoCtrl', function TodoCtrl($scope, $location) {
    })
;

