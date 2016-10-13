'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': 'Profile',
    'state': 'profile'
  }, {
    'title': 'Trip',
    'state': 'trip'
  }, {
    'title': 'Search',
    'state': 'search',
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('uwece651f16NewApp')
  .controller('NavbarController', NavbarController);
