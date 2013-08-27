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
/// <reference path="..\mainreferences.ts" />
var MainControllers;
(function (MainControllers) {
    var MainAboutCtrl = (function () {
        function MainAboutCtrl() {
        }
        MainAboutCtrl.prototype.contructor = function ($scope) {
            $scope.vm = this;
        };
        return MainAboutCtrl;
    })();
    MainControllers.MainAboutCtrl = MainAboutCtrl;
})(MainControllers || (MainControllers = {}));
;
/// <reference path="..\mainreferences.ts" />
var MainControllers;
(function (MainControllers) {
    var MainHomeCtrl = (function () {
        function MainHomeCtrl() {
        }
        MainHomeCtrl.prototype.contructor = function ($scope) {
            $scope.vm = this;
        };
        return MainHomeCtrl;
    })();
    MainControllers.MainHomeCtrl = MainHomeCtrl;
})(MainControllers || (MainControllers = {}));
;
;

angular.module('App.Main', [
    'ngRoute'
]).config(function myMainConfig($routeProvider) {
    $routeProvider.when('/home', {
        controller: 'MainHomeCtrl',
        templateUrl: 'app/main/home/home.tpl.html'
    }).when('/about', {
        controller: 'MainAboutCtrl',
        templateUrl: 'app/main/about/about.tpl.html'
    }).otherwise({ redirectTo: '/home' });
}).controller(MainControllers);
;

angular.module('App.Todo', [
    'ngRoute'
]).config(function myTodoConfig($routeProvider) {
    $routeProvider.when('/todo', {
        controller: 'TodoTodoListCtrl',
        templateUrl: 'app/todo/todolist/todolist.tpl.html'
    }).when('/todo/:todoId', {
        controller: 'TodoTodoDetailsCtrl',
        templateUrl: 'app/todo/tododetails/tododetails.tpl.html'
    });
}).controller(TodoControllers);
/// <reference path="..\todoreferences.ts" />
var TodoControllers;
(function (TodoControllers) {
    var TodoTodoDetailsCtrl = (function () {
        function TodoTodoDetailsCtrl() {
        }
        TodoTodoDetailsCtrl.prototype.contructor = function ($scope) {
            $scope.vm = this;
        };
        return TodoTodoDetailsCtrl;
    })();
    TodoControllers.TodoTodoDetailsCtrl = TodoTodoDetailsCtrl;
})(TodoControllers || (TodoControllers = {}));
;
/// <reference path="..\todoreferences.ts" />
var TodoControllers;
(function (TodoControllers) {
    var TodoTodoListCtrl = (function () {
        function TodoTodoListCtrl() {
        }
        TodoTodoListCtrl.prototype.contructor = function ($scope) {
            $scope.vm = this;
        };
        return TodoTodoListCtrl;
    })();
    TodoControllers.TodoTodoListCtrl = TodoTodoListCtrl;
})(TodoControllers || (TodoControllers = {}));
;
/// <reference path='./modelreferences.ts' />
var Model;
(function (Model) {
    'use strict';

    var TodoItem = (function () {
        function TodoItem(title, completed) {
            this.title = title;
            this.completed = completed;
        }
        return TodoItem;
    })();
    Model.TodoItem = TodoItem;
})(Model || (Model = {}));
//@ sourceMappingURL=app.js.map
