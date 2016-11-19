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


  constructor(Auth, $scope, $modal, $log) {
    this.$scope = $scope;
    this.$modal = $modal;
    this.$log = $log;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$scope.items = ['item1', 'item2', 'item3'];
  }

  open (size) {
    var _scope = this.$scope;
    var _log = this.$log;
    var modalInstance = this.$modal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'modal',
      size: size,
      resolve: {
        items: function () {
          return _scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      _scope.selected = selectedItem;
    }, function () {
      _log.info('Modal dismissed at: ' + new Date());
    });
  };
}


class ModalInstanceCtrl {
  new_trip = {};

  constructor($scope, $state, $modalInstance, $http, items, Auth) {
    this.$scope = $scope;
    this.$state = $state;
    this.$modalInstance = $modalInstance;
    this.items = items;
    this.$scope.selected = {
      item: this.items[0]
    };
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUser;

    // for calendar
    // for calendar
    this.today();
    this.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.status_pickup = {opened: false};
    $scope.status_arrive = {opened: false};
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events = [{
      date: tomorrow,
      status: 'full'
    }, {
      date: afterTomorrow,
      status: 'partially'
    }];
  }

  today() {
    this.$scope.arrive_dt = new Date();
    this.$scope.pickup_dt = new Date();
  }

  clear() {
    this.$scope.arrive_dt = null;
    this.$scope.arrive_dt = null;
  }

  disabled(date, mode) {
    return false;
  }

  toggleMin() {
    this.$scope.minDate = this.$scope.minDate ? null : new Date();
  }

  open($event, target) {
    this.$scope['status_' + target].opened = true;
  }

  getDayClass(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < this.$scope.events.length; i++) {
        var currentDay = new Date(this.$scope.events[i].date);
        if (dayToCheck === currentDay) {
          return this.$scope.events[i].status;
        }
      }
    }
    return '';
  }


  ok() {
    var user = this.getCurrentUser();
    this.new_trip.driverId = user.driver._id;
    this.$http.post('/api/trips', this.new_trip)
      .success(response => {
        console.log(response);
        this.$modalInstance.close(this.$scope.selected.item);
        this.$state.go('trip');
      });
  }
  cancel (){
    this.$modalInstance.dismiss('cancel');
  }

}

angular.module('uwece651f16NewApp')
  .controller('NavbarController', NavbarController);

angular.module('uwece651f16NewApp')
  .controller('ModalInstanceCtrl', ModalInstanceCtrl);
