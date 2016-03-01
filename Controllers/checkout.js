UserInfoApp.controller("checkoutCtrl", [
        "$scope", "$http", "$rootScope", "$localStorage", "$location", "userDataFactory", "userInfoFactory", "$sessionStorage", function ($scope, $http, $rootScope, $localStorage, $location, userDataFactory, userInfoFactory, $sessionStorage) {
            $rootScope.PageName = "Checkout Page";
            $scope.productList = [];
        var productList = [];
            if ($localStorage.cartItems != undefined) {
                var count = 1;

                var alreadyidinlist = [];
                for (var i = 0; i < $localStorage.cartItems.length; i++) {
                    if (alreadyidinlist.indexOf($localStorage.cartItems[i]._id.$oid) === -1) {
                        var tempid = $localStorage.cartItems[i]._id.$oid;
                        var tempProduct = {};
                        tempProduct.ProductName = $localStorage.cartItems[i].ProductName;
                        tempProduct.ProductPrice = $localStorage.cartItems[i].ProductPrice;
                        for (var j = i + 1; j < $localStorage.cartItems.length - 1; j++) {
                            if (tempid === $localStorage.cartItems[j]._id.$oid) {
                                count = count + 1;
                            }
                        }
                        tempProduct.ProductCount = count;
                        tempProduct.Total = parseFloat(tempProduct.ProductCount) * parseFloat(tempProduct.ProductPrice);
                        count = 0;
                        $scope.productList[i] = tempProduct;
                        productList[i] = tempProduct;
                        alreadyidinlist[i] = $localStorage.cartItems[i]._id.$oid;
                    }
                }
                $localStorage.checkoutProductItems = $scope.productList;
            }
            
           
            $scope.deleteitem = function ($event) {
                var id = $event.target.attributes.id.value;
                for (var k = 0; k < $scope.productList.length; k++) {
                    if ($scope.productList[k]._id === id) {
                        $scope.productList.splice(k, 1);
                        $localStorage.checkoutProductItems[k] = undefined;
//                        for (var l = 0; l < $localStorage.cartItems.length; l++) {
//                            if (id === $localStorage.cartItems[l]._id.$oid) {
//                                $localStorage.cartItems[l] = undefined;
//                            }
//                        }
                        $location.path('/checkout');
                    }
                }
            }
            $scope.placeOrder = function () {
                userInfoFactory.placeOrder($sessionStorage.loginDetails._id.$oid, productList).then(function (response) {
                    if (response === "Success") {
                        alert("Order Placed Successfully");
                    }
                });
            }
        }
    ]);