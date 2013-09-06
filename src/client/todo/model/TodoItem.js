var Todo;
(function (Todo) {
    /// <reference path='./todomodelreferences.ts' />
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
    })(Todo.Model || (Todo.Model = {}));
    var Model = Todo.Model;
})(Todo || (Todo = {}));
//# sourceMappingURL=TodoItem.js.map
