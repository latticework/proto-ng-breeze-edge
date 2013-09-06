/// <reference path="../todoreferences.ts" />

module TodoDirectives {
    'use strict';

    export class TodoEscape {
        private ESCAPE_KEY = 27;

        parseService: ng.IParseService;

        constructor($parse) {
            this.parseService = $parse;
        }
        link($scope: ng.IScope, element: JQuery, attributes: any) {
            element.bind('keydown', (event: KeyboardEvent) => {
                if (event.keyCode === this.ESCAPE_KEY) {
                    $scope.$apply(attributes.TodoEscape);
                };
            });
        }
    }
};

