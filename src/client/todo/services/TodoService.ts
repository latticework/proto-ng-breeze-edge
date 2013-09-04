/// <reference path=".\todoservicesreferences.ts" />

module Todo.Services {
    export class TodoService {
        getTodos(): Model.TodoItem[]{
            return [
                new Model.TodoItem("Todo Item1", false),
                new Model.TodoItem("Todo Item2", false),
                new Model.TodoItem("Todo Item3", false),
            ];
        }
        addTodo(todoItem: Model.TodoItem): void {
        }
        updateTodo(todoItem: Model.TodoItem): void {
        }
        removeTodo(todoItem: Model.TodoItem): void {
        }
    }
}