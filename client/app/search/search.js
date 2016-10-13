'use strict';

angular.module('uwece651f16NewApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'search'
      });
  });
