/// <reference path='./todomodelreferences.ts' />

module Todo.Model {
    'use strict';

    export class TodoItem {
        constructor(public title: string, public completed: boolean) { }
    }
}
