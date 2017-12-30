'use strict';

angular.module('inventory.services', ['ngResource'])
    .constant("baseURL", "https://whispering-mountain-55762.herokuapp.com/")

    // Factory connected to remote MongoDB database
    .factory('itemFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        return $resource(baseURL + "items/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

    }]);