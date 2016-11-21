'use strict';

class TripModalInstanceCtrl {
  new_trip = {};

  constructor($scope, $state, $modalInstance, $http, Auth, $filter) {
    this.$scope = $scope;
    this.$state = $state;
    this.$filter = $filter;
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
    this.checkTime();
    this.checkPrice();
    this.checkCar();
    this.setOtherInfo();

    if (this.alerts.length > 0) {
      return;
    }

    this.$http.post('/api/trips', this.new_trip)
      .success(response => {
        this.$modalInstance.close();
        if($state.name == 'trip')
          this.$state.reload();
        else
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
      this.alerts.push({msg: 'Please input correct Pick-up location!'});
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
      this.alerts.push({msg: 'Please input correct Drop-off location!'});
      return;
    }
  }

  setTripDriverId() {
    var user = this.getCurrentUser();
    this.new_trip.driverId = user.driver._id;
  }

  checkTime() {
    if (!this.new_trip.f_datetime) {
      this.alerts.push({msg: 'Please select Pick-up time!'});
      return;
    }
    if (!this.new_trip.t_datetime) {
      this.alerts.push({msg: 'Please select Drop-off time!'});
      return;
    }
    this.new_trip.f_datetime = new Date(this.new_trip.f_datetime);
    this.new_trip.t_datetime = new Date(this.new_trip.t_datetime);
    if (moment(this.new_trip.t_datetime).isBefore(this.new_trip.f_datetime)) {
      this.alerts.push({msg: 'Please set Drop-off time after Pick-up time!'});
      return;
    }
  }

  checkPrice(){
    if (!this.new_trip.price || this.new_trip.price < 0) {
      this.alerts.push({msg: 'Please input valid price!'});
      return;
    }
  }

  checkCar(){
    if (!this.new_trip.car_model) {
      this.alerts.push({msg: 'Please select your car!'});
      return;
    }
    this.new_trip.vehicleId = _.filter(this.vehicles, v => {
      return v.model == this.new_trip.car_model;
    })[0]._id;
    if (!parseInt(this.new_trip.seats)) {
      this.alerts.push({msg: 'Please select your available seats!'});
      return;
    }
    this.new_trip.seats_available = parseInt(this.new_trip.seats);
  }

  setOtherInfo(){
    this.new_trip.open = true;
    this.new_trip.completed = false;
  }
}

angular.module('uwece651f16NewApp')
  .controller('TripModalInstanceCtrl', TripModalInstanceCtrl);

