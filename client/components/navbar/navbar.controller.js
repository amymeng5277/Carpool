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
    'title': 'My Trip',
    'state': 'trip'
  }, {
    'title': 'Search',
    'state': 'search'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $scope, $modal, $log, $state) {
    this.$scope = $scope;
    this.$modal = $modal;
    this.$log = $log;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$state = $state;
  }

  open(size) {
    var user = this.getCurrentUser();
    if (!user._id) {
      this.$state.go('login');
      return;
    }
    var _scope = this.$scope;
    var _log = this.$log;
    var modalInstance = this.$modal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'app/trip/modal/trip.modal.html',
      controller: 'TripModalInstanceCtrl',
      controllerAs: 'tripModal',
      backdrop: 'static',
      size: size,
      //resolve: {
      //}
    });
    modalInstance.result.then(function (selectedItem) {
      _scope.selected = selectedItem;
    }, function () {
      _log.info('Modal dismissed at: ' + new Date());
    });
  }

  // For timepicker
  mytime = new Date();
  ismeridian = true;

  toggleMode() {
    ismeridian = !ismeridian;
  }

  isDriver() {
    var user = this.getCurrentUser();
    return !!user.driver;
  }

  update() {
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    mytime = d;
  }

  changed() {
    $log.log('Time changed to: ' + mytime);
  }

  clear() {
    mytime = null;
  }
}

angular.module('uwece651f16NewApp')
  .controller('NavbarController', NavbarController);
