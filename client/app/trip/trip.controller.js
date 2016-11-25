'use strict';

(function () {

  class TripController {

    constructor($http, $scope, socket, Auth, $state, $timeout) {
      this.$http = $http;
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.awesomeThings = [];
      this.trip_info = [];
      var _this = this;
      Auth.getCurrentUser(user=> {
        if (!user._id) {
          $state.go('login');
          return;
        }
        $http.get('/api/users/' + user._id + '/trips').success(response=> {
          _this.trip_info = response;
        });
      });
    }

  }

  angular.module('uwece651f16NewApp')
    .controller('TripController', TripController);

})();

