var Todo;
(function (Todo) {
    /// <reference path=".\todoservicesreferences.ts" />
    (function (Services) {
        var TodoService = (function () {
            function TodoService() {
            }
            TodoService.prototype.getTodos = function () {
                return [
                    new Todo.Model.TodoItem("Todo Item1", false),
                    new Todo.Model.TodoItem("Todo Item2", false),
                    new Todo.Model.TodoItem("Todo Item3", false)
                ];
            };
            TodoService.prototype.addTodo = function (todoItem) {
            };
            TodoService.prototype.updateTodo = function (todoItem) {
            };
            TodoService.prototype.removeTodo = function (todoItem) {
            };
            return TodoService;
        })();
        Services.TodoService = TodoService;
    })(Todo.Services || (Todo.Services = {}));
    var Services = Todo.Services;
})(Todo || (Todo = {}));
//# sourceMappingURL=TodoService.js.map
