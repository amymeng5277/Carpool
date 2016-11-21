'use strict';

(function () {

  class TripController {

    constructor($http, $scope, socket, Auth, $state) {
      this.$http = $http;
      this.$scope = $scope;
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
          console.log(_this.trip_info);
        });
      });

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
        socket.syncUpdates('thing', this.awesomeThings);
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('thing');
      });


    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {name: this.newThing});
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('uwece651f16NewApp')
    .controller('TripController', TripController);

})();

