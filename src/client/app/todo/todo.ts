/// <reference path=".\todoreferences.ts" />

module TodoControllers {
};

angular.module('App.Todo', [
    'ngRoute', // angular-route.js
])

    .config(function myTodoConfig($routeProvider) {
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


    .controller(TodoControllers)
;

