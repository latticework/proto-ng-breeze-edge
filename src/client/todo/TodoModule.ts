/// <reference path=".\todoreferences.ts" />

module Todo {
    'use strict';

    angular.module('Todo', [
    ])
        .service('todoService', Services.TodoService)
    ;
}

