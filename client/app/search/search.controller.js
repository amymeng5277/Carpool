'use strict';

(function() {

class SearchController {
  trip_info = [];
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.awesomeThings = [];
    var _this = this;
    $http.get('/api/trips/').success(response=> {
      _this.trip_info = response;
      console.log(_this.trip_info);

      if (_this.trip_info.length == 0) {
        $('#no-matches-1').show();
        $('#no-matches-2').hide();
      } else {
        $('#no-matches-1').hide();
        $('#no-matches-2').hide();
      }
    });

    $scope.queryTrips = function() {
      // build search query, hardcoded url to local host (need to change)
      var pickup = $('#pickup').val();
      pickup = pickup.split(' ').join('+');
      var dropoff = $('#dropoff').val();
      dropoff = dropoff.split(' ').join('+');
      var time = $('#datetime').val();
      time = time.split(' ').join('+');

      // double check that all fields are entered
      if (pickup == '' || dropoff == '' || time == '') {
        $('.error').show();
        return;
      } else {
        $('.error').hide();
      }

      var url = '/api/trips?pickup=' + pickup + '&dropoff=' + dropoff + '&time=' + time;
      $http.get(url).success(response=> {
        _this.trip_info = response;
        console.log(_this.trip_info);

        if (_this.trip_info.length == 0) {
          $('#no-matches-1').show();
          $('#no-matches-2').hide();
        } else {
          $('#no-matches-1').hide();
          $('#no-matches-2').hide();
        }
      });
    };

    $scope.postQuery = function() {
      Auth.getCurrentUser(user=> {
        if (!user._id) {
          $state.go('login');
          return;
        }

        var data = {
          'passengerId': user._id,
          'f_city': $('#pickup').val(),
          't_city': $('#dropoff').val(),
          'dep_date_f': $('#datetime').val()
        };

        $http.post('/api/querys', data).success(response=> {
          $('#no-matches-1').hide();
          $('#no-matches-2').show();
        });
      });
    };

    $scope.joinTrip = function(tripId) {
      Auth.getCurrentUser(user=> {
        if (!user._id) {
          $state.go('login');
          return;
        }
        $http.post('/api/trips/' + tripId[0] + '/passengers', {'passengerId': user._id}).success(response=> {
          window.location.href = "/trip";
        });
      });
    };

    $scope.expandMap = function() {
      var map = $("#map");
      if (map.height() < 400) {
        map.height(400);
      } else {
        map.height(100);
      }
    };

    $scope.changeMap = function () {
      var origin = '';
      var destination = '';
      if ($('#pickup').val().trim() == '') {
        origin = 'DC Library, Ring Road, Waterloo, ON, Canada';
      } else {
        origin = $('#pickup').val().split(' ').join('+');
      }
      if ($('#dropoff').val().trim() == '') {
        destination = 'Airport Road, Toronto, ON, Canada';
      } else {
        destination = $('#dropoff').val().split(' ').join('+');
      }

      var url = "https://www.google.com/maps/embed/v1/directions";
      url += "?key=AIzaSyA-S7NFs0U7prOtOHVF558VSL51qOlOmd0";
      url += "&origin=" + origin;
      url += "&destination=" + destination;
      url += "&avoid=tolls|highways";
      console.log(url);

      var map = $('#map');
      map.attr('src', url);
    };

    $scope.toggleInfo = function(row) {
      var rowElement = $("#row" + row);
      toggleDetails(rowElement);
    };
  }

  // addThing() {
  //   if (this.newThing) {
  //     this.$http.post('/api/things', { name: this.newThing });
  //     this.newThing = '';
  //   }
  // }

  // deleteThing(thing) {
  //   this.$http.delete('/api/things/' + thing._id);
  // }
}

angular.module('uwece651f16NewApp')
  .controller('SearchController', SearchController);

})();
