'use strict';

class TripModalInstanceCtrl {
  new_trip = {};

  constructor($scope, $state, $modalInstance, $http, Auth) {
    this.$scope = $scope;
    this.$state = $state;
    this.$modalInstance = $modalInstance;
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUser;
    var _this = this;
    // get vehicles of this driver
    this.getCurrentUser(function (user) {
      var v;
      for (v in user.driver.vehicles) {
        var seats_option = [];
        for (var index = 0; index < user.driver.vehicles[v].seat; index++) {
          seats_option[index] = index + 1;
        }
        user.driver.vehicles[v].seats_option = seats_option;
      }
      _this.vehicles = user.driver.vehicles;
    });
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

  cancel() {
    this.$modalInstance.dismiss('cancel');
  }

}

angular.module('uwece651f16NewApp')
  .controller('TripModalInstanceCtrl', TripModalInstanceCtrl);

