/// <reference path=".\todoreferences.ts" />

angular.module('app.todo', [
    'ngRoute', // angular-route.js
    'app.todo.todolist',
    'app.todo.tododetails',
])

    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('/todo', {
                controller: 'TodoTodoListCtrl',
                templateUrl: '/app/todolist/todolist.tpl.html',
            })
            .when('/todo/:todoId', {
                controller: 'TodoTodoDetailsCtrl',
                templateUrl: '/app/tododetails/tododetails.tpl.html',
            });
    })


    .controller('TodoCtrl', function TodoCtrl($scope, $location) {
    })
;

