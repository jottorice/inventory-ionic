angular.module('inventory.controllers', [])

    // Generic app controller. This is just a place-holder ATM, but it would be where we
    // would initialize authentication, etc.
    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform) {
        console.log("In AppCtrl");
    })

    // Controller for the home page. "items" is already instantiated from the DB by the state configuration "resolve"
    // code in app.js. 
    .controller('IndexController', ['$scope', 'items', 'baseURL', 'itemFactory', function($scope, items, baseURL, itemFactory) {

        $scope.baseURL = baseURL;
        $scope.message = "Loading ...";

        $scope.showItems = true;
        $scope.items = items;
        
        console.log("IndexController resolved items:");
        console.log(items);
        
        // Callback routine for "pull to refresh" functionality (drag down and release
        // on the list, to cause the app to refresh it's list from the back-end Mongo DB).
        // I'm glad this Ionic app at least has *this* one nice piece of functionality. ;-)
        $scope.doRefresh = function() {
            console.log("In refresh");
            
            itemFactory.query()
                .$promise.then(
                    function (response) {
                        var items = response;
                        console.log("Refreshed items:");
                        console.log(items);
                        $scope.items = items;
                        $scope.showItems = true;
                        // Stop the ion-refresher from spinning after we receive results from the DB
                        $scope.$broadcast('scroll.refreshComplete');
                    },
                    function (response) {
                        $scope.message = "Error when refreshing: " + response.status + " " + response.statusText;
                         // Stop the ion-refresher from spinning, if we get an error querying the DB
                        $scope.$broadcast('scroll.refreshComplete');
                   }
                )
        }

    }]);