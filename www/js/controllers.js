angular.module('inventory.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera) {
        console.log("In AppCtrl");
    })


    .controller('IndexController', ['$scope', 'items', 'baseURL', function($scope, items, baseURL) {

        $scope.baseURL = baseURL;
        $scope.message = "Loading ...";

        $scope.showItems = true;
        $scope.items = items;
        
        console.log("IndexController resolved items:");
        console.log(items);
        
    }]);