/// <reference path="..\mainreferences.ts" />

module MainControllers {
    export class MainHomeCtrl {
        greeting: string = "Hello HCJ World!";
        constructor($scope) {
            this.greeting = "Goodbye HCJ World!";
            $scope.vm = this;
        }
        OnButtonClicked() {
            console.log("Button Clicked");
        }
    }
};