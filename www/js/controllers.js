angular.module('inventory.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera) { // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = $localStorage.getObject('userinfo', '{}');

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);
            $localStorage.storeObject('userinfo', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

        $scope.reservation = {};

        // Create the reserve modal that we will use later
        $ionicModal.fromTemplateUrl('templates/reserve.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.reserveform = modal;
        });

        // Triggered in the reserve modal to close it
        $scope.closeReserve = function() {
            $scope.reserveform.hide();
        };

        // Open the reserve modal
        $scope.reserve = function() {
            $scope.reserveform.show();
        };

        // Perform the reserve action when the user submits the reserve form
        $scope.doReserve = function() {
            console.log('Doing reservation', $scope.reservation);

            // Simulate a reservation delay. Remove this and replace with your reservation
            // code if using a server system
            $timeout(function() {
                $scope.closeReserve();
            }, 1000);
        };

        $scope.registration = {};

        // Create the registration modal that we will use later
        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.registerform = modal;
        });

        // Triggered in the registration modal to close it
        $scope.closeRegister = function() {
            $scope.registerform.hide();
        };

        // Open the registration modal
        $scope.register = function() {
            $scope.registerform.show();
        };

        // Perform the registration action when the user submits the registration form
        $scope.doRegister = function() {
            // Simulate a registration delay. Remove this and replace with your registration
            // code if using a registration system
            $timeout(function() {
                $scope.closeRegister();
            }, 1000);
        };

        $ionicPlatform.ready(function() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $scope.takePicture = function() {
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                    console.log(err);
                });

                $scope.registerform.show();

            };
        });
    })


    .controller('IndexController', ['$scope', 'items', 'baseURL', function($scope, items, baseURL) {

        $scope.baseURL = baseURL;
        $scope.message = "Loading ...";

        $scope.showItems = true;
        $scope.items = items;
        
        console.log("IndexController resolved items:");
        console.log(items);
        
    }]);