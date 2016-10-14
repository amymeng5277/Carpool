'use strict';

(function () {

  class TripController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.$scope = $scope;
      this.awesomeThings = [];

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
        socket.syncUpdates('thing', this.awesomeThings);
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('thing');
      });

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
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
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
          var currentDay = new Date(this.$scope.events[i].date).setHours(0, 0, 0, 0);
          if (dayToCheck === currentDay) {
            return this.$scope.events[i].status;
          }
        }
      }
      return '';
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

