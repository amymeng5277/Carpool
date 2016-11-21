'use strict';

(function() {

class SearchController {

  trip_info = [];
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];
    var _this = this;
    $http.get('/api/trips/').success(response=> {
      _this.trip_info = response;
      console.log(_this.trip_info);
    });

    // $http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   socket.syncUpdates('thing', this.awesomeThings);
    // });

    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });

    function padLeft(str, places, pad) {
      while (str.length < places) {
        str = pad + str;
      }
      return str;
    }

    function createResultEntry(data, rowNumber) {
      var depart = new Date(0);
      depart.setUTCSeconds(data['time']);
      var strDepart = (depart.getMonth()+1).toString() +'/'+ depart.getDate().toString() +'/'+ depart.getFullYear().toString();
      if (depart.getHours() >= 12) {
        strDepart += '<br> ' + (depart.getHours()-12).toString();
        strDepart += ':' + padLeft(depart.getMinutes().toString(), 2, '0');
        strDepart += ' PM';
      } else {
        strDepart += '<br> ' + depart.getHours().toString();
        strDepart += ':' + padLeft(depart.getMinutes().toString(), 2, '0');
        strDepart += ' AM';
      }

      var strPref = ''
      for (var idx = 0; idx < data['preferences'].length; idx++) {
        strPref += ' <i class="fa fa-' + data['preferences'][idx]['pref'] + '"></i> ';
      }

      var table = $("#searchResultTable");
      var row = $('<tr>', {id: 'row'+rowNumber});
      var col1 = $('<td><p class="pcity">'+data['pick-up']['city']+'</p><div class="expandDetail paddress">'+data['pick-up']['address']+'</div></td>');
      var col2 = $('<td><p class="dcity">'+data['drop-off']['city']+'</p><div class="expandDetail daddress">'+data['drop-off']['address']+'</div></td>');
      var col3 = $('<td><button type="button" class="transparent-btn" id="locate"><span class="glyphicon glyphicon-map-marker"></span></button></td>');
      var col4 = $('<td>'+strDepart+'</td>');
      var col5 = $('<td>'+data['spots']+'/'+data['vehicle']['seats']+'<div class="expandDetail"><img class="car-seats" src="assets/images/car.png"></div></td>');
      var col6 = $('<td>'+strPref+'</td>');
      var col7 = $('<td>'+data['vehicle']['type']+'<div class="expandDetail">'+data['vehicle']['make']+' '+data['vehicle']['model']+' '+data['vehicle']['year']+'</div></td>')
      var col8 = $('<td>\
        <button type="button" ng-click="toggleInfo('+rowNumber+')" class="transparent-btn" id="expand">\
          <span id="arrow" class="glyphicon glyphicon-chevron-down"></span>\
        </button>\
        <button type="button" class="btn btn-sm btn-join btn-success" id="join-'+data['tripid']+'">Join</button>\
      </td>');

      row.append(col1).append(col2).append(col3).append(col4).append(col5).append(col6).append(col7).append(col8);
      table.append(row);
    }

    function populateSearchTable(results) {
      for (var idx = 0; idx < results['result'].length; idx++) {
        createResultEntry(results['result'][idx], idx+1);
      }
    }

    $scope.doQuery = function(operation) {
      // clear previous search results
      $("[id^=row]").remove();

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

      var url = "/query?pickup=" + pickup + "&dropoff=" + dropoff + "&time=" + time;
      //console.log(url);

      $('#query-saved').hide();

      // restful call to get search results
      if (operation == 'GET') {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();

        if (xhr.status == 200) {
          var result = JSON.parse(xhr.response);
          if (result['result'].length == 0) {
            $('#no-matches').show();
            return;
          }
          $('#no-matches').hide();
          populateSearchTable(result);
        }

      // post a query for notification when one exists
      } else if (operation == 'POST') {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.send();

        if (xhr.status == 0) {
          $('#no-matches').hide();
          $("#query-saved").show();
        }
      }
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
