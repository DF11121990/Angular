UserInfoApp.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/UserList', {
                    templateUrl: 'Partials/DisplayUserInfo.htm',
                    controller: 'DisplayUserInfoCtrl'
                }).
                when('/EditUserInfoDetails', {
                    templateUrl: 'Partials/EditUserInfo.htm',
                    controller: 'EditUserInfoController'
                }).
                when('/Register', {
                    templateUrl: 'Partials/UserInfo.htm',
                    controller: 'UserInfoController'
                }).
                 when('/Login', {
                     templateUrl: 'Partials/Login.htm',
                     controller: 'LoginCtrl'
                 }).
                 when('/Home', {
                     templateUrl: 'Partials/Home.htm',
                     controller: 'HomeCtrl'
                 }). 
                 when('/Logout', {
                     templateUrl: 'Partials/Login.htm',
                     controller: 'LoginCtrl'
                 }).
                 when('/RouteParams/:first', {
                     templateUrl: 'Partials/RouteParamsExample.htm',
                     controller: 'RouteParamsCtrl'

                 }). when('/checkout', {
                     templateUrl: 'Partials/checkout.htm',
                     controller: 'checkoutCtrl'

                 }).
                otherwise({
                    redirectTo: '/'
                });
        }
    ]);