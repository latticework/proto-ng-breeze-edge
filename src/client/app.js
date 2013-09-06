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
/// <reference path="../mainreferences.ts" />
var MainControllers;
(function (MainControllers) {
    var MainAboutCtrl = (function () {
        function MainAboutCtrl($scope) {
            $scope.vm = this;
        }
        return MainAboutCtrl;
    })();
    MainControllers.MainAboutCtrl = MainAboutCtrl;
})(MainControllers || (MainControllers = {}));
;
/// <reference path="../mainreferences.ts" />
var MainControllers;
(function (MainControllers) {
    var MainHomeCtrl = (function () {
        function MainHomeCtrl($scope) {
            this.greeting = "Hello HCJ World!";
            this.greeting = "Goodbye HCJ World!";
            $scope.vm = this;
        }
        MainHomeCtrl.prototype.OnButtonClicked = function () {
            console.log("Button Clicked");
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
/// <reference path="../todoreferences.ts" />
var TodoDirectives;
(function (TodoDirectives) {
    'use strict';

    var TodoBlur = (function () {
        function TodoBlur($parse) {
            this.parseService = $parse;
        }
        TodoBlur.prototype.link = function ($scope, element, attributes) {
            //element.bind('blur', () => $scope.$apply(attributes.TodoBlur));
            element.bind('blur', function () {
                return $scope.$apply(attributes.TodoBlur);
            });
        };
        return TodoBlur;
    })();
    TodoDirectives.TodoBlur = TodoBlur;
})(TodoDirectives || (TodoDirectives = {}));
;
/// <reference path="../todoreferences.ts" />
var TodoControllers;
(function (TodoControllers) {
    'use strict';

    var TodoTodoListCtrl = (function () {
        // re: filterFilter, see http://docs.angularjs.org/api/ng.$filter#comment-646368377
        // and http://docs.angularjs.org/api/ng.filter:filter
        function TodoTodoListCtrl($scope, filterFilter, todoService) {
            $scope.vm = this;

            this.filterFilter = filterFilter;
            this.todoService = todoService;

            this.todos = this.todoService.getTodos();

            this.newTodo = '';
            this.editedTodo = null;
            var that = this;

            //$scope.$watch('vm.todos', this.onTodos, true);
            $scope.$watch('vm.todos', function (newValue, oldValue) {
                // // RE: filterFilter, see http://docs.angularjs.org/api/ng.filter:filter
                //this.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
                //this.doneCount = this.todos.length - this.remainingCount;
                //this.allChecked = !this.remainingCount;
                that.remainingCount = that.filterFilter(that.todos, { completed: false }).length;
                that.doneCount = that.todos.length - that.remainingCount;
                that.allChecked = !that.remainingCount;
            }, true);
        }
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
            this.originalTodo = angular.copy(this.editedTodo);
        };
        TodoTodoListCtrl.prototype.markAll = function (completed) {
            this.todos.forEach(function (todoItem) {
                todoItem.completed = completed;
            });
        };
        TodoTodoListCtrl.prototype.quitEditing = function (todoItem) {
            this.todos[this.todos.indexOf(todoItem)] = this.originalTodo;
            this.doneEditing(this.originalTodo);
        };
        TodoTodoListCtrl.prototype.removeTodo = function (todoItem) {
            this.todos.splice(this.todos.indexOf(todoItem), 1);
            this.todoService.removeTodo(todoItem);
        };
        return TodoTodoListCtrl;
    })();
    TodoControllers.TodoTodoListCtrl = TodoTodoListCtrl;
})(TodoControllers || (TodoControllers = {}));
;
/// <reference path="../todoreferences.ts" />
var TodoControllers;
(function (TodoControllers) {
    var TodoTodoDetailsCtrl = (function () {
        function TodoTodoDetailsCtrl($scope) {
            $scope.vm = this;
        }
        return TodoTodoDetailsCtrl;
    })();
    TodoControllers.TodoTodoDetailsCtrl = TodoTodoDetailsCtrl;
})(TodoControllers || (TodoControllers = {}));
;
/// <reference path=".\todoreferences.ts" />
angular.module('App.Todo', [
    'ngRoute',
    'Todo'
]).config(function myTodoConfig($routeProvider) {
    $routeProvider.when('/todo', {
        controller: 'TodoTodoListCtrl',
        templateUrl: 'app/todo/todolist/todolist.tpl.html'
    }).when('/todo/:todoId', {
        controller: 'TodoTodoDetailsCtrl',
        templateUrl: 'app/todo/tododetails/tododetails.tpl.html'
    });
}).directive(TodoDirectives).controller(TodoControllers);
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
/// <reference path="../todoreferences.ts" />
var TodoDirectives;
(function (TodoDirectives) {
    'use strict';

    var TodoEscape = (function () {
        function TodoEscape($parse) {
            this.ESCAPE_KEY = 27;
            this.parseService = $parse;
        }
        TodoEscape.prototype.link = function ($scope, element, attributes) {
            var _this = this;
            element.bind('keydown', function (event) {
                if (event.keyCode === _this.ESCAPE_KEY) {
                    $scope.$apply(attributes.TodoEscape);
                }
                ;
            });
        };
        return TodoEscape;
    })();
    TodoDirectives.TodoEscape = TodoEscape;
})(TodoDirectives || (TodoDirectives = {}));
;
/// <reference path="../todoreferences.ts" />
var TodoDirectives;
(function (TodoDirectives) {
    'use strict';

    var TodoFocus = (function () {
        function TodoFocus($timeout) {
            this.timeoutService = $timeout;
        }
        TodoFocus.prototype.link = function ($scope, element, attributes) {
            var _this = this;
            $scope.$watch(attributes.todoFocus, function (newValue) {
                if (newValue) {
                    _this.timeoutService(function () {
                        return element[0].focus();
                    }, 0, false);
                }
            });
        };
        return TodoFocus;
    })();
    TodoDirectives.TodoFocus = TodoFocus;
})(TodoDirectives || (TodoDirectives = {}));
;
/// <reference path=".\todoreferences.ts" />
var Todo;
(function (Todo) {
    'use strict';

    angular.module('Todo', []).service('todoService', Todo.Services.TodoService);
})(Todo || (Todo = {}));
//@ sourceMappingURL=app.js.map
