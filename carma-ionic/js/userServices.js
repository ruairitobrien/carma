/* global angular */

angular.module('carma.services', [])

    .factory('UserService', function ($http, User) {
        'use strict';

        var API_URL = 'https://api.car.ma/api/rtr/v1.0/object/trip/nearbyUsers';
        var PAGE_SIZE = 5;
        var currentPage = 1;
        var nextPage = 1;

        var fetchUsers = function (next) {
            nextPage = 1;
            getNearbyUsers(next);
        };

        var fetchNextPage = function (next) {
            getNearbyUsers(next);
        };

        var getNearbyUsers = function (next) {
            try {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        $http(
                            {
                                method: 'GET',
                                url: API_URL,
                                params: {
                                    originLon: position.coords.longitude,
                                    originLat: position.coords.latitude,
                                    pageSize: PAGE_SIZE,
                                    pageNum: nextPage
                                }
                            }).success(function (data) {
                                if (data && data.nearbyUsers && data.nearbyUsers.length > 0) {
                                    currentPage = data.paginator.number;
                                    if(currentPage < data.paginator.totalPages) {
                                        nextPage = currentPage + 1;
                                    }
                                    next(null, User.apiResponseTransformer(data.nearbyUsers));
                                } else {
                                    var err = new Error('No data found');
                                    err.type = 'no results';
                                    next(err);
                                }
                            }).
                            error(function () {
                                next(new Error('Error fetching user'));
                            });
                    }, function (err) {
                        next(err);
                    });

            } catch (err) {
                next(err);
            }
        };

        return {
            fetchUsers: fetchUsers,
            fetchNextPage: fetchNextPage
        };

    })

    .factory('User', function () {
        'use strict';

        /**
         * User object to hold details for each user returned in API calls.
         *
         * @param alias
         * @param firstName
         * @param photoURL
         * @param lastKnownLocation
         * @param lastSeen
         * @param phoneNumber
         * @constructor
         */
        function User(alias, firstName, photoURL, lastKnownLocation, lastSeen, phoneNumber) {
            this.alias = alias;
            this.firstName = firstName;
            this.photoURL = photoURL;
            this.lastKnownLocation = lastKnownLocation;
            this.lastSeen = lastSeen;
            this.phoneNumber = phoneNumber;
        }

        User.build = function (data) {
            return new User(
                    data.alias || '',
                    data.firstName || '',
                    data.photoURL || '',
                data.lastKnownLocation,
                new Date(data.lastSeen),
                data.phoneNumber
            );
        };

        /**
         * Format the last seen date value to a human readable string
         *
         * @returns {string}
         */
        User.prototype.formattedLastSeenDateTime = function () {
            var hours = this.lastSeen.getHours();
            var minutes = this.lastSeen.getMinutes();
            return this.lastSeen.toLocaleDateString() + ' ' + hours + ':' + minutes + ((hours > 12) ? 'pm' : 'am');
        };


        /**
         * Helper function to convert API response data
         *
         * @param responseData
         * @returns {*}
         */
        User.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData
                    .map(User.build)
                    .filter(Boolean);
            }
        };

        /**
         * Return the constructor function
         */
        return User;
    });