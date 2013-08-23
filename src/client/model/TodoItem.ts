/// <reference path='./modelreferences.ts' />

module Model {
    'use strict';

    export class TodoItem {
        constructor(public title: string, public completed: boolean) { }
    }
}
