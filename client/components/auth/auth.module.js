'use strict';

angular.module('uwece651f16NewApp.auth', [
  'uwece651f16NewApp.constants',
  'uwece651f16NewApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
