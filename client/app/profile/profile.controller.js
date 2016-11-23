'use strict';

(function () {

  class ProfileController {

    constructor($http, $scope, socket, Auth, $state, $modal) {
      this.$http = $http;
      this.$state = $state;
      this.$modal = $modal;
      var _this = this;

      Auth.getCurrentUser(function (user) {
        _this.currentUser = user;
        $http.get('/api/users/' + user._id + '/vehicles')
          .success(response => {
            _this.myVehicle1 = response[0];
            _this.myVehicle2 = response[1];
          });
      });
    }

    save() {
      if (this.currentUser._id) {
        // update
        this.$http.put('/api/users/' + this.currentUser._id + '/basicInfo', this.currentUser)
          .success(function (response) {
            console.log(response);
          });

      } else {
        this.driverId = this.currentUser.driver_id;
        this.$http.post('/api/users/basicInfoCreat', this.currentUser)
          .success(function (response) {
            console.log(response);
          });
      }

      if (this.myVehicle1) {
        if (this.myVehicle1._id) {
          // update
          this.$http.put('/api/vehicles/' + this.myVehicle1._id, this.myVehicle1)
            .success(function (response) {
              console.log(response);
            });

        } else {
          // create
          console.log(this.currentUser.driver);
          this.myVehicle1 = {};
          this.myVehicle1.driverId = this.currentUser.driver._id;
          this.$http.post('/api/vehicles', this.myVehicle1)
            .success(function (response) {
              console.log(response);
            });
        }
      }

      if (this.myVehicle2) {
        if (this.myVehicle2 && this.myVehicle2._id) {
          // update
          this.$http.put('/api/vehicles/' + this.myVehicle2._id, this.myVehicle2)
            .success(function (response) {
              console.log(response);
            });

        } else {
          // create
          console.log(this.currentUser.driver);
          this.myVehicle2 = {};
          this.myVehicle2.driverId = this.currentUser.driver._id;
          this.$http.post('/api/vehicles', this.myVehicle2)
            .success(function (response) {
              console.log(response);
            });
        }
      }

      //var _state = this.$state;
      var modalInstance = this.$modal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        size: 'sm',
        backdrop: 'static',
        controller: function ($state, $modalInstance, $scope) {
          $scope.ok = function () {
            $modalInstance.close();
            $state.reload();
          };
        }
      });
    }
  }


  angular.module('uwece651f16NewApp')
    .controller('ProfileController', ProfileController);

})();
