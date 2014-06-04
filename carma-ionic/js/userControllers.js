/* global angular */

angular.module('carma.controllers', [])
.controller('UserCtrl', function ($scope, $ionicPopup, UserService) {
        'use strict';
        $scope.users = [];


        var fetchUsers = function (next) {
            UserService.fetchUsers(function (err, users) {
                if(err) {
                    $ionicPopup.alert({
                        title: 'Error fetching more users',
                        template: err.message
                    });
                } else {
                    $scope.users = users;
                }
                if(next) {
                    next();
                }
            });
        };

        $scope.doRefresh = function () {
            fetchUsers(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.nextPage = function () {
            UserService.fetchNextPage(function (err, users) {
                if(err) {
                    $ionicPopup.alert({
                        title: 'Error fetching more users',
                        template: err.message
                    });
                } else {
                    $scope.users = $scope.users.concat(users);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        fetchUsers();

    });