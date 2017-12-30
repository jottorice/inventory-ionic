'use strict';

angular.module('inventory.services', ['ngResource'])
    .constant("baseURL", "https://whispering-mountain-55762.herokuapp.com/")

    .factory('itemFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        return $resource(baseURL + "items/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

    }])

    .factory('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

    }])

    .factory('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        return $resource(baseURL + "promotions/:id");

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {


        return $resource(baseURL + "leadership/:id");

    }])

    .factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {


        return $resource(baseURL + "feedback/:id");

    }])

    .factory('favoriteFactory', ['$resource', 'baseURL', '$localStorage', function($resource, baseURL, $localStorage) {
        var favFac = {};
        var favorites = $localStorage.getObject('favorites', '[]');

        favFac.addToFavorites = function(index) {
            for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].id == index)
                    return;
            }
            favorites.push({
                id: index
            });
            $localStorage.storeObject('favorites', favorites);
        };

        favFac.deleteFromFavorites = function(index) {
            for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].id == index) {
                    favorites.splice(i, 1);
                }
            }
            $localStorage.storeObject('favorites', favorites);
        }

        favFac.getFavorites = function() {
            return favorites;
        };

        return favFac;
    }])

;