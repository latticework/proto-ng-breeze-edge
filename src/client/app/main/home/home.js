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
//# sourceMappingURL=home.js.map
