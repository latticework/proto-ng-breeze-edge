/// <reference path="../todoreferences.ts" />
var TodoControllers;
(function (TodoControllers) {
    'use strict';

    var TodoTodoListCtrl = (function () {
        function TodoTodoListCtrl() {
        }
        // re: filterFilter, see http://docs.angularjs.org/api/ng.$filter#comment-646368377
        // and http://docs.angularjs.org/api/ng.filter:filter
        TodoTodoListCtrl.prototype.contructor = function ($scope, filterFilter, todoService) {
            $scope.vm = this;

            this.filterFilter = filterFilter;
            this.todoService = todoService;

            this.todos = this.todoService.getTodos();

            this.newTodo = '';
            this.editedTodo = null;

            $scope.$watch('vm.todos', this.onTodos, true);
        };
        TodoTodoListCtrl.prototype.addTodo = function () {
            if (!this.newTodo.length) {
                return;
            }

            var todoItem = new Todo.Model.TodoItem(this.newTodo, false);
            this.todos.push(todoItem);
            this.todoService.addTodo(todoItem);
            this.newTodo = '';
        };
        TodoTodoListCtrl.prototype.clearDoneTodos = function () {
            this.todos = this.todos.filter(function (todoItem) {
                return !todoItem.completed;
            });
        };
        TodoTodoListCtrl.prototype.doneEditing = function (todoItem) {
            this.editedTodo = null;
            if (!todoItem.title) {
                this.removeTodo(todoItem);
            } else {
                this.todoService.updateTodo(todoItem);
            }
        };
        TodoTodoListCtrl.prototype.editTodo = function (todoItem) {
            this.editedTodo = todoItem;
        };
        TodoTodoListCtrl.prototype.markAll = function (completed) {
            this.todos.forEach(function (todoItem) {
                todoItem.completed = completed;
            });
        };
        TodoTodoListCtrl.prototype.removeTodo = function (todoItem) {
            this.todos.splice(this.todos.indexOf(todoItem), 1);
            this.todoService.removeTodo(todoItem);
        };

        TodoTodoListCtrl.prototype.onTodos = function () {
            // // RE: filterFilter, see http://docs.angularjs.org/api/ng.filter:filter
            this.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
            this.doneCount = this.todos.length - this.remainingCount;
            this.allChecked = !this.remainingCount;
        };
        return TodoTodoListCtrl;
    })();
    TodoControllers.TodoTodoListCtrl = TodoTodoListCtrl;
})(TodoControllers || (TodoControllers = {}));
;
//# sourceMappingURL=todolist.js.map
