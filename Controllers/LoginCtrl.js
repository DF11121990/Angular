UserInfoApp.controller("LoginCtrl", [
        "$scope", "$http", "$rootScope", "$sessionStorage", "$location", "userInfoFactory", "$routeParams", "$route", "$window", function ($scope, $http, $rootScope, $sessionStorage, $location, userInfoFactory, $routeParams, $route, $window) {
            $scope.loginDetails = {};
            $rootScope.PageName = "Login";
        if ($sessionStorage.loginDetails != undefined) {
            if ($rootScope.IsLoggedIn === true) {
                $rootScope.IsLoggedIn = false;
                $sessionStorage.loginDetails = undefined;
            }
        } else {
            $rootScope.IsLoggedIn = false; 
        }
        $scope.validateLoginDetails = function () {
                userInfoFactory.validateLoginDetails($scope.loginDetails).then(function(loginDetails) {
                    $sessionStorage.loginDetails = angular.fromJson(loginDetails);
                    $location.path('/Home');
                });
            };
        }
    ]);