/// <reference path="..\todoreferences.ts" />

module TodoControllers {
    export class TodoTodoListCtrl {
        allChecked: Model.TodoItem[];
        doneCount: number;
        editedTodo: Model.TodoItem;
        newTodo: Model.TodoItem;
        remainingCount: number;
        todos: Model.TodoItem[];

        contructor($scope) {
            $scope.vm = this;
        }
        addTodo() {
        }
        clearDoneTodos() {
        }
        doneEditing(todo: Model.TodoItem) {
        }
        editTodo(todo: Model.TodoItem) {
        }
        markAll(completed: boolean) {
            this.todos.forEach((todoItem: Model.TodoItem) => {
                todoItem.completed = completed;
            });
        }
        removeTodo(todo: Model.TodoItem) {
        }
    }
};