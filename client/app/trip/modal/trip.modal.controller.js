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
    this.alerts = [];
    this.new_trip = {};
    this.datetimepicker_options = {sideBySide: true, minDate: new Date()};
  }

  closeAlert(index) {
    this.alerts.splice(index, 1);
  }

  ok() {
    this.setTripDriverId();
    this.extractGoogleMapDetails();

    return;
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

  extractGoogleMapDetails() {
    if (this.new_trip.pickup_details && this.new_trip.pickup_details.address_components) {
      _.each(this.new_trip.pickup_details.address_components, component => {
        if (component.types.length == 2 && component.types[0] == 'locality') {
          this.new_trip.f_city = component.short_name;
        }
      });
      this.new_trip.f_address = this.new_trip.pickup_details.formatted_address;
      this.new_trip.f_latitude = this.new_trip.pickup_details.geometry.location.lat();
      this.new_trip.f_longitude = this.new_trip.pickup_details.geometry.location.lng();
    } else {
      this.alerts.push({msg: 'Please input correct Pick-up Info!'});
      return;
    }
    if (this.new_trip.dropoff_details && this.new_trip.dropoff_details.address_components) {
      _.each(this.new_trip.dropoff_details.address_components, component => {
        if (component.types.length == 2 && component.types[0] == 'locality') {
          this.new_trip.t_city = component.short_name;
        }
      });
      this.new_trip.t_address = this.new_trip.dropoff_details.formatted_address;
      this.new_trip.t_latitude = this.new_trip.dropoff_details.geometry.location.lat();
      this.new_trip.t_longitude = this.new_trip.dropoff_details.geometry.location.lng();
    } else {
      this.alerts.push({msg: 'Please input correct Drop-off Info!'});
      return;
    }
  }

  setTripDriverId() {
    var user = this.getCurrentUser();
    this.new_trip.driverId = user.driver._id;
  }
}

angular.module('uwece651f16NewApp')
  .controller('TripModalInstanceCtrl', TripModalInstanceCtrl);

