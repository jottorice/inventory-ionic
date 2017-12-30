angular.module('inventory.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform) {
        console.log("In AppCtrl");
    })


    .controller('IndexController', ['$scope', 'items', 'baseURL', 'itemFactory', function($scope, items, baseURL, itemFactory) {

        $scope.baseURL = baseURL;
        $scope.message = "Loading ...";

        $scope.showItems = true;
        $scope.items = items;
        
        console.log("IndexController resolved items:");
        console.log(items);
        
        $scope.doRefresh = function() {
            console.log("In refresh");
            
            var items = itemFactory.query()
                .$promise.then(
                    function (response) {
                        var items = response;
                        console.log("Refreshed items:");
                        console.log(items);
                        $scope.items = items;
                        $scope.showItems = true;
                        //Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    },
                    function (response) {
                        $scope.message = "Error when refreshing: " + response.status + " " + response.statusText;
                         //Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                   }
                )



        }

    }]);