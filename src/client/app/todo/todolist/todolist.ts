/// <reference path="../todoreferences.ts" />

module TodoControllers {
    'use strict';

    export interface TodoTodoListCtrlScope extends ng.IScope {
        vm: TodoTodoListCtrl;
    }

    export class TodoTodoListCtrl {
        allChecked: boolean;
        doneCount: number;
        editedTodo: Todo.Model.TodoItem;
        filterFilter: Function;
        newTodo: string;
        originalTodo: Todo.Model.TodoItem;
        remainingCount: number;
        todos: Todo.Model.TodoItem[];
        todoService: Todo.Services.TodoService;

        // re: filterFilter, see http://docs.angularjs.org/api/ng.$filter#comment-646368377
        // and http://docs.angularjs.org/api/ng.filter:filter
        constructor($scope: TodoTodoListCtrlScope, filterFilter: Function, todoService: Todo.Services.TodoService) {
            $scope.vm = this;

            this.filterFilter = filterFilter;
            this.todoService = todoService;

            this.todos = this.todoService.getTodos();

            this.newTodo = '';
            this.editedTodo = null;
            var that = this;

            //$scope.$watch('vm.todos', this.onTodos, true);
            $scope.$watch('vm.todos', (newValue: any, oldValue: any) => {
                // // RE: filterFilter, see http://docs.angularjs.org/api/ng.filter:filter
                //this.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
                //this.doneCount = this.todos.length - this.remainingCount;
                //this.allChecked = !this.remainingCount;
                that.remainingCount = that.filterFilter(that.todos, { completed: false }).length;
                that.doneCount = that.todos.length - that.remainingCount;
                that.allChecked = !that.remainingCount;
            }, true);

        }
        addTodo() {
            if (!this.newTodo.length) {
                return;
            }

            var todoItem = new Todo.Model.TodoItem(this.newTodo, false);
            this.todos.push(todoItem);
            this.todoService.addTodo(todoItem);
            this.newTodo = '';
        }
        clearDoneTodos() {
            this.todos = this.todos.filter((todoItem) => {
                return !todoItem.completed;
            });
        }
        doneEditing(todoItem: Todo.Model.TodoItem) {
            this.editedTodo = null;
            if (!todoItem.title) {
                this.removeTodo(todoItem);
            }
            else {
                this.todoService.updateTodo(todoItem);
            }
        }
        editTodo(todoItem: Todo.Model.TodoItem) {
            this.editedTodo = todoItem;
            this.originalTodo = angular.copy(this.editedTodo);
        }
        markAll(completed: boolean) {
            this.todos.forEach((todoItem: Todo.Model.TodoItem) => {
                todoItem.completed = completed;
            });
        }
        quitEditing(todoItem: Todo.Model.TodoItem) {
            this.todos[this.todos.indexOf(todoItem)] = this.originalTodo;
            this.doneEditing(this.originalTodo);
        }
        removeTodo(todoItem: Todo.Model.TodoItem) {
            this.todos.splice(this.todos.indexOf(todoItem), 1);
            this.todoService.removeTodo(todoItem);
        }

        //private onTodos() {
        //    // // RE: filterFilter, see http://docs.angularjs.org/api/ng.filter:filter
        //    this.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
        //    this.doneCount = this.todos.length - this.remainingCount;
        //    this.allChecked = !this.remainingCount;
        //}
    }
};