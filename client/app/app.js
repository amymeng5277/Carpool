'use strict';

angular.module('uwece651f16NewApp', [
  'uwece651f16NewApp.auth',
  'uwece651f16NewApp.admin',
  'uwece651f16NewApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngAutocomplete',
  'datetimepicker'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
