/// <reference path="../todoreferences.ts" />

module TodoDirectives {
    'use strict';

    export class TodoBlur {
        parseService: ng.IParseService;

        constructor($parse) {
            this.parseService = $parse;
        }
        link($scope: ng.IScope, element: JQuery, attributes: any) {
            //element.bind('blur', () => $scope.$apply(attributes.TodoBlur));
            element.bind('blur', () => $scope.$apply(attributes.TodoBlur));
        }
    }
};

