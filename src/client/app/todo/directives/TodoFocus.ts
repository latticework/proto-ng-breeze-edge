/// <reference path="../todoreferences.ts" />

module TodoDirectives {
    'use strict';

    export class TodoFocus {
        timeoutService: ng.ITimeoutService;

        constructor($timeout) {
            this.timeoutService = $timeout;
        }
        link($scope: ng.IScope, element: JQuery, attributes: any) {
            $scope.$watch(attributes.todoFocus, (newValue: any) => {
                if (newValue) {
                    this.timeoutService(() => element[0].focus(), 0, false);
                }
            });
        }
    }
};

