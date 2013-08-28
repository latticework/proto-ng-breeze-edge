/// <reference path="..\mainreferences.ts" />

module MainControllers {
    export class MainHomeCtrl {
        greeting: string = "Hello HCJ World!";
        contructor($scope) {
            this.greeting = "Goodbye HCJ World!";
            $scope.vm = this;
        }
    }
};