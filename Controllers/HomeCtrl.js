UserInfoApp.controller("HomeCtrl", [
        "$scope", "$http", "$rootScope", "$localStorage", "$location", "userInfoFactory", function ($scope, $http, $rootScope, $localStorage, $location, userInfoFactory) {
            $rootScope.IsLoggedIn = true; 
            $rootScope.PageName = "Home Page";
            var itemsInCart = [];
            $localStorage.cartItems = undefined;
            userInfoFactory.getProductList().then(function(productList) {
                $scope.productList = angular.fromJson(productList);
                $localStorage.productList = angular.fromJson(productList);
            });
            if ($localStorage.loginDetails != undefined) {
                $rootScope.username = $localStorage.loginDetails.email;
                //angular.element(document.querySelector('.demo-avatar-dropdown span')).html('' + $localStorage.loginDetails.email+'');
            }
            $scope.addToCart = function($event) {
                if ($localStorage.productList != undefined) {
                    var totalPrice = 0;
                    for (var i = 0; i < $localStorage.productList.length; i++) {
                        if ($event.target.attributes.id.value === $localStorage.productList[i]._id.$oid) {

                            if ($localStorage.cartItems != undefined) {
                                itemsInCart = $localStorage.cartItems;
                                itemsInCart.push($localStorage.productList[i]);
                                $localStorage.cartItems = itemsInCart;
                                for (var j = 0; j < $localStorage.cartItems.length; j++) {
                                    totalPrice = totalPrice + parseFloat(itemsInCart[i].ProductPrice);
                                }
                                $rootScope.PageName = "Your Cart Items :" + $localStorage.cartItems.length + '      Total Price :' + totalPrice;
                            } else {
                                itemsInCart.push($localStorage.productList[i]);
                                $localStorage.cartItems = itemsInCart;
                                totalPrice = totalPrice + parseFloat($localStorage.productList[i].ProductPrice);
                                $rootScope.PageName = "Your Cart Items :" + $localStorage.cartItems.length + '      Total Price :' + totalPrice; ;
                            }
                            
                        }
                    }

                }
            }
        }
    ]);