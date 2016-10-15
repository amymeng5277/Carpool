'use strict';

(function () {

  class TripController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.$scope = $scope;
      this.awesomeThings = [];
      $scope.trips = [
        {open: false, completed: false},
        {open: false, completed: false},
        {open: false, completed: true},
        {open: false, completed: true},
        {open: false, completed: true},
        {open: false, completed: true},
        {open: false, completed: true},
        {open: false, completed: true},
        {open: false, completed: true}
      ];

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

