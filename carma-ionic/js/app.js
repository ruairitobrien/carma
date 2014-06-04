/* global angular */

angular.module('carma', ['ionic', 'carma.controllers', 'carma.services'])

    .config(function ($compileProvider) {
        'use strict';
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })

    .config(function ($httpProvider) {
        'use strict';
        $httpProvider.defaults.timeout = 10000;
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/app.html'

            })

            .state('app.users', {
                url: '/users',
                parent: 'app',
                templateUrl: 'views/userListing.html'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/users');

    });