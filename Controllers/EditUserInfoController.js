UserInfoApp.controller("EditUserInfoController", [
        "$scope", "$http", "$rootScope", "userInfoFactory", "$localStorage", "userDataFactory", function ($scope, $http, $rootScope, userInfoFactory, $localStorage, userDataFactory) {
            $scope.user = {};
            $rootScope.PageName = "Edit Registered User";
            var editcopyuser = {};
            $scope.array = [];
            $scope.array_ = angular.copy($scope.array);
            $scope.LocationPrefrenceChecked = [];
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
                var promise;
                if (!promise) {
                    $http.defaults.headers.post['Content-Type'] = 'application/json';
                    var urlBase = "../../UserInfo/SaveUserInfoDetails";
                    $scope.user.Location = $scope.LocationPrefrenceChecked;
                    angular.copy($scope.user, editcopyuser);
                    editcopyuser.DOB = moment(editcopyuser.DOB).format('DD/MM/YYYY');
                    promise = $http.post(urlBase, { UserInfoDetails: JSON.stringify(editcopyuser) }).then(function (response) {
                        return response.data;
                    });
                }
            }
            var _editcopyuser = userDataFactory.userData;
            if (_editcopyuser != undefined) {
                if (angular.isDate(_editcopyuser.DOB) === false) {
                    var dateElements = _editcopyuser.DOB.split('/');
                    _editcopyuser.DOB = new Date(dateElements[2], dateElements[1], dateElements[0]);
                } else {
                    _editcopyuser.DOB = new Date(_editcopyuser.DOB);
                }
                if (_editcopyuser.country != null) {
                    $scope.LoadStates(_editcopyuser.country);
                }
                if (_editcopyuser.state != null) {
                    $scope.LoadDistricts(_editcopyuser.state);
                }
                if (_editcopyuser.district != null) {
                    $scope.LoadTalukas(_editcopyuser.district);
                }
                if (_editcopyuser.Location != null) {
                    $scope.array = $scope.LocationPrefrenceChecked = _editcopyuser.Location;
                }
                $scope.user = _editcopyuser;
            }
        }
    ]).directive("checkboxGroup", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                // Determine initial checked boxes
                if (scope.array.indexOf(scope.d.StateName) !== -1) {
                    elem[0].checked = true;
                }

                // Update array on click
                elem.bind('click', function () {
                    var index = scope.array.indexOf(scope.d.StateName);
                    // Add if checked
                    if (elem[0].checked) {
                        if (index === -1) {
                            scope.array.push(scope.d.StateName);
                            scope.LocationPrefrenceChecked.push(scope.d.StateName);
                        }
                    }
                    // Remove if unchecked
                    else {
                        if (index !== -1) {
                            scope.array.splice(index, 1);
                            scope.LocationPrefrenceChecked.splice(index, 1);
                        }
                    }
                    console.log(scope.LocationPrefrenceChecked);
                    // Sort and update DOM display
                    scope.$apply(scope.array.sort(function (a, b) {
                        return a - b;
                    }));
                });
            }
        }
    });