UserInfoApp.factory('userDataFactory', [
            '$http', function ($http) {
                var userData = {};
                return userData;
            }
        ]);
UserInfoApp.factory('userInfoFactory', [
        '$http', function ($http) {
            var userInfoFactory = {};

            var baseurl = "../../MasterData/";
            userInfoFactory.getCountryList = function () {
                var promise;
                if (!promise) {
                    var urlBase = baseurl + 'getCountryList';
                    promise = $http.get(urlBase).then(function (response) {
                        return response.data;
                    }); ;
                }
                return promise;
            };
            userInfoFactory.getStates = function (CountryName) {
                var promise;
                if (!promise) {
                    var urlBase = baseurl + 'getStateList';
                    promise = $http.post(urlBase, { countryName: JSON.stringify(CountryName) }).then(function (response) {
                        return response.data;
                    }); ;
                }
                return promise;
            };
            userInfoFactory.getDistricts = function (StateName) {
                var promise;
                if (!promise) {
                    var urlBase = baseurl + 'getDistrictList';
                    promise = $http.post(urlBase, { stateName: JSON.stringify(StateName) }).then(function (response) {
                        return response.data;
                    }); ;
                }
                return promise;
            };
            userInfoFactory.getTalukas = function (DistrictName) {
                var promise;
                if (!promise) {
                    var urlBase = baseurl + 'getTalukaList';
                    promise = $http.post(urlBase, { districtName: JSON.stringify(DistrictName) }).then(function (response) {
                        return response.data;
                    }); ;
                }
                return promise;
            };
            userInfoFactory.validateLoginDetails = function (loginDetails) {
                var promise;
                if (!promise) {
                    var urlBase = "../../UserInfo/validateLoginDetails";
                    promise = $http.post(urlBase, { loginDetails: JSON.stringify(loginDetails) }).then(function (response) {
                        return response.data;
                    });
                }
                return promise;
            };
            userInfoFactory.getProductList = function () {
                var promise;
                if (!promise) {
                    var urlBase = "../../UserInfo/getProductList";
                    promise = $http.get(urlBase).then(function (response) {
                        return response.data;
                    });
                }
                return promise;
            };
            userInfoFactory.placeOrder = function (Id,productList) {
                var promise;
                if (!promise) {
                    var urlBase = "../../UserInfo/placeOrder";
                    promise = $http.post(urlBase, { Id: Id, productList: angular.toJson(productList) }).then(function (response) {
                        return response.data;
                    });
                }
                return promise;
            };
            return userInfoFactory;
        }
    ]);