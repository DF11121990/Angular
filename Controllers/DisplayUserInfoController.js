UserInfoApp.controller("DisplayUserInfoCtrl", [
        "$scope", "$http", "$rootScope", "$localStorage", "$location", "userDataFactory", "userInfoFactory", function ($scope, $http, $rootScope, $localStorage, $location, userDataFactory, userInfoFactory) {
            $rootScope.PageName = "Display User List";
            $scope.getUserInfoDetails = function () {
                var promise;
                if (!promise) {
                    var urlBase = "../../UserInfo/getUserInfoDetails";
                    $http.post(urlBase).then(function (response) {
                        $scope.userList = angular.fromJson(response.data);
                        $localStorage.userList = $scope.userList;
                    }); ;
                }

            };
            $scope.LoadElement = function ($event) {
                var id = $event.toElement.getAttribute("data");
                var user = {};
                if ($localStorage.userList != undefined) {
                    for (var i = 0; i < $localStorage.userList.length; i++) {
                        if ($localStorage.userList[i]._id === id) {
                            user = $localStorage.userList[i];
                            userDataFactory.userData = user;
                        }
                    }
                    $rootScope.$emit('EditEvent', user);
                    $location.path('/EditUserInfoDetails');
                }

            };
            $scope.getUserInfoDetails();
        }
    ]);