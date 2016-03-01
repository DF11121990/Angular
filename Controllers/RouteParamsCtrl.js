UserInfoApp.controller("RouteParamsCtrl", [
        "$scope", "$http", "$rootScope", "$localStorage", "$location", "userDataFactory", "$routeParams", function ($scope, $http, $rootScope, $localStorage, $location, userDataFactory, $routeParams) {
            $rootScope.PageName = "Route Param Example";
        }
    ]);