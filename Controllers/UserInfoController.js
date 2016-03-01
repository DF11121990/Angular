UserInfoApp.controller("UserInfoController", [
    "$scope", "$http", "$rootScope", "userInfoFactory", "$location", function ($scope, $http, $rootScope, userInfoFactory, $location) {
        $scope.user = {
            ConfirmPassword:''
        };
        $scope.userInfo = {};

        $scope.change = function (ConfirmPassword) {
            if (ConfirmPassword != undefined && $scope.user.Password != undefined) {
                if (ConfirmPassword === $scope.user.Password) {
                    angular.element(document.querySelector('#submit')).removeAttr('disabled');
                    angular.element(document.querySelector('#IsPasswordMatch')).html('');
             
                } else {
                    angular.element(document.querySelector('#IsPasswordMatch')).html("<span style='color:'red''>Confirm Password not matching</span>");
                    angular.element(document.querySelector('#submit')).attr('disabled', true);
                }
            }
        }
        $scope.$watch('user.ConfirmPassword', function (ConfirmPassword) {
            $scope.change(ConfirmPassword);
        }); 
       
        var copyuser = {};
        $rootScope.PageName = "Register User";
        $scope.array = [];
        $scope.array_ = angular.copy($scope.array);
        $scope.LocationPrefrenceChecked = [];
        $scope.$watchCollection('LocationPrefrenceChecked', function (LocationPrefrenceChecked) {
            console.log(LocationPrefrenceChecked.length);
            if (LocationPrefrenceChecked.length > 0) {
                angular.element(document.querySelector('#submit')).removeAttr('disabled');
                angular.element(document.querySelector('#IsCheckBoxChecked')).html('');

            } else {
                angular.element(document.querySelector('#IsCheckBoxChecked')).html("<span style='color:'red''>Please check at least one checkbox</span>");
                angular.element(document.querySelector('#submit')).attr('disabled', true);
            }
        });
       
            userInfoFactory.getCountryList().then(function (countryList) {
                $scope.countryList = angular.fromJson(countryList);
            });
            $scope.LoadStates = function (countryName) {
                userInfoFactory.getStates(countryName).then(function (stateList) {
                    $scope.stateList = angular.fromJson(stateList);
                });
            }
            $scope.LoadDistricts = function (stateName) {
                userInfoFactory.getDistricts(stateName).then(function (districtList) {
                    $scope.districtList = angular.fromJson(districtList);
                });
            }
            $scope.LoadTalukas = function (districtName) {
                userInfoFactory.getTalukas(districtName).then(function (talukaList) {
                    $scope.talukaList = angular.fromJson(talukaList);
                });
            }
            $scope.SaveUserInfoDetails = function () {
               
                    $http.defaults.headers.post['Content-Type'] = 'application/json';
                    var urlBase = "../../UserInfo/SaveUserInfoDetails";
                    $scope.user.Location = $scope.LocationPrefrenceChecked;
                    angular.copy($scope.user, copyuser);
                    copyuser.DOB = moment(copyuser.DOB).format('DD/MM/YYYY');
                    copyuser.CustomID = '';
                    $http.post(urlBase, { UserInfoDetails: JSON.stringify(copyuser) }).then(function (response) {
                        $location.path("/UserList");
                    });
                
            }

            $scope.getUserInfoDetails = function () {
                var promise;
                if (!promise) {
                    var urlBase = "../../UserInfo/getUserInfoDetails";
                    $http.post(urlBase).then(function (response) {
                        var fuser, _copyuser = {};

                        fuser = angular.fromJson(response.data);
                        if (fuser.length > 0) {
                            _copyuser = fuser[0];
                            var dateElements = _copyuser.DOB.split('/');
                            _copyuser.DOB = new Date(dateElements[2], dateElements[1], dateElements[0]);
                            if (_copyuser.country != null) {
                                $scope.LoadStates(_copyuser.country);
                            }
                            if (_copyuser.state != null) {
                                $scope.LoadDistricts(_copyuser.state);
                            }
                            if (_copyuser.district != null) {
                                $scope.LoadTalukas(_copyuser.district);
                            }
                            if (_copyuser.Location != null) {
                                $scope.array = $scope.LocationPrefrenceChecked = _copyuser.Location;
                            }
                            $scope.user = _copyuser;
                        }
                    });
                }

            };
    }
]);