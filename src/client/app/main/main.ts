/// <reference path=".\mainreferences.ts" />

module MainControllers {
};

angular.module('App.Main', [
    'ngRoute', // angular-route.js
])

    .config(function myMainConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                controller: 'MainHomeCtrl',
                templateUrl: 'app/main/home/home.tpl.html',
            })
            .when('/about', {
                controller: 'MainAboutCtrl',
                templateUrl: 'app/main/about/about.tpl.html',
            })
            .otherwise({ redirectTo: '/home' });
    })


    .controller(MainControllers)
    //.controller('MainHomeCtrl', function MainHomeCtrl($scope) {
    //    $scope.vm = { greeting: "Hello Angular World!", };
    //})
    //.controller('MainAboutCtrl', function MainAboutCtrl($scope) {
    //    $scope.vm = { greeting: "Goodbye Angular World!", };
    //})
;

