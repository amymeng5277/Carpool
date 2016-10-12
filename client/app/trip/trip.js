'use strict';

angular.module('uwece651f16NewApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('trip', {
        url: '/trip',
        templateUrl: 'app/trip/trip.html',
        controller: 'TripController',
        controllerAs: 'trip'
      });
  });
