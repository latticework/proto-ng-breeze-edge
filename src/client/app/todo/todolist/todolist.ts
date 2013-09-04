/// <reference path="../todoreferences.ts" />

module TodoControllers {
    'use strict';

    export class TodoTodoListCtrl {
        allChecked: boolean;
        doneCount: number;
        editedTodo: Todo.Model.TodoItem;
        filterService: ng.IFilterService;
        newTodo: string;
        remainingCount: number;
        statusFilter: { completed: boolean };
        todos: Todo.Model.TodoItem[];
        todoService: Todo.Services.TodoService;

        contructor($scope: ng.IScope, $filter: ng.IFilterService, todoService: Todo.Services.TodoService) {
            (<any>$scope).vm = this;

            this.filterService = $filter;
            this.todoService = todoService;
        }
        addTodo() {
            if (!this.newTodo.length) {
                return;
            }

            this.todos.push(new Todo.Model.TodoItem(this.newTodo, false));
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
        }
        editTodo(todoItem: Todo.Model.TodoItem) {
            this.editedTodo = todoItem;
        }
        markAll(completed: boolean) {
            this.todos.forEach((todoItem: Todo.Model.TodoItem) => {
                todoItem.completed = completed;
            });
        }
        removeTodo(todoItem: Todo.Model.TodoItem) {
            this.todos.splice(this.todos.indexOf(todoItem), 1);
        }


        private onPath(path: string) {
            this.statusFilter =
            (path == '/active')
            ? { completed: false }
            : (path == '/completed')
            ? { completed: true }
            : null;
        }
        private onTodos() {
            this.remainingCount = this.filterService(this.todos, { completed: false }).length;
            this.doneCount = this.todos.length - this.remainingCount;
            this.allChecked = !this.remainingCount
            this.todoStorage.put(this.todos);
        }
    }
};