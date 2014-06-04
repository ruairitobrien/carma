/* global alert */

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
    'use strict';

    this.alias = alias;
    this.firstName = firstName;
    this.photoURL = photoURL;
    this.lastKnownLocation = lastKnownLocation;
    this.lastSeen = lastSeen;
    this.phoneNumber = phoneNumber;
}

/**
 * Format the last seen date value to a human readable string
 *
 * @returns {string}
 */
User.prototype.formattedLastSeenDateTime = function () {
    'use strict';
    var hours = this.lastSeen.getHours();
    var minutes = this.lastSeen.getMinutes();
    return this.lastSeen.toLocaleDateString() + ' ' + hours + ':' + minutes + ((hours > 12) ? 'pm' : 'am');
};

/**
 * Manages connection to API for retrieval of user lists
 */
var userService = function () {
    'use strict';

    var API_URL = 'https://api.car.ma/api/rtr/v1.0/object/trip/nearbyUsers';
    var PAGE_SIZE = 5;

    var page = 1;
    var userList = [];

    /**
     * Transform User JSON data to a User object
     *
     * @param userJson
     * @returns {User}
     */
    var apiTransform = function (userJson) {
        return new User(
                userJson.alias || '',
                userJson.firstName || '',
                userJson.photoURL || '',
                userJson.lastKnownLocation,
                new Date(userJson.lastSeen),
                userJson.phoneNumber
        );
    };

    /**
     * Create a properly formatted URL for REST API calls
     *
     * @param longitude
     * @param latitude
     * @param page
     * @returns {string}
     */
    function buildUrl(longitude, latitude, page) {
        return API_URL + '?originLon=' + longitude + '&originLat=' + latitude + '&pageSize=' + PAGE_SIZE + ((page) ? '&pageNum=' + page : '');
    }

    /**
     * Public getter for user list
     *
     * @returns {Array}
     */
    var getUserList = function () {
        return userList;
    };

    /**
     * Public setter for user list
     *
     * @param users
     */
    var loadUserList = function (users) {
        userList = [];
        return appendUserList(users);
    };

    /**
     * Adds user objects to user list once they are transformed from JSON
     *
     * @param users
     * @returns {Array}
     */
    var appendUserList = function (users) {
        if(users) {
            userList = userList.concat(users.map(apiTransform));
        }
        return userList;
    };

    /**
     * Connect to API to retrieve nearby users. Uses HTML5 location API.
     *
     * @param next
     * @param page
     */
    function getNearbyUsers(next, page) {
        if(!page) {
            page = 1;
        }
         var client = new XMLHttpRequest();
         navigator.geolocation.getCurrentPosition(
         function (position) {
            var url = buildUrl(position.coords.longitude, position.coords.latitude, page);
            client.open('GET', url, true);
            client.setRequestHeader('Content-Type', 'application/json');
            client.responseType = 'json';
            client.onload = function () {
                if (client.status === 200) {
                    if(client.response.nearbyUsers && client.response.nearbyUsers.length && client.response.nearbyUsers.length > 0) {
                        next(null, loadUserList(client.response.nearbyUsers), page);
                    } else {
                        next(new Error('No users found'));
                    }

                } else {
                    next(new Error('An error occurred: ' + client.status + ' ' + client.statusText));
                }
            };
            client.send();
        }, function (err) {
            next(err);
        });
    }

    /**
     * Request the next page of Users from the API
     *
     * @param next
     */
    function loadMoreNearbyUsers(next) {
        page = page + 1;
        getNearbyUsers(next, page);
    }

    return {
        buildUrl: buildUrl,
        loadUserList: loadUserList,
        appendUserList: appendUserList,
        getUserList: getUserList,
        getNearbyUsers: getNearbyUsers,
        loadMoreNearbyUsers: loadMoreNearbyUsers
    };
}();