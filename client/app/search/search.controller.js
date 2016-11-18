'use strict';

(function() {

class SearchController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    // $http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   socket.syncUpdates('thing', this.awesomeThings);
    // });

    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });

    function createResultEntry(data, rowNumber) {
      var table = $("#searchResultTable");
      var row = $('<tr>', {id: 'row'+rowNumber});
      var col1 = $('<td>'+data['pick-up']['city']+'<div class="expandDetail">'+data['pick-up']['address']+'</div></td>');
      var col2 = $('<td>'+data['drop-off']['city']+'<div class="expandDetail">'+data['drop-off']['address']+'</div></td>');
      var col3 = $('<td><button type="button" class="transparent-btn"><span class="glyphicon glyphicon-map-marker"></span></button></td>');
      var col4 = $('<td>2/13/2016 4:00 PM<div class="expandDetail">In 48h 45m</div></td>');
      var col5 = $('<td>3/4<div class="expandDetail"><img class="car-seats" src="assets/images/car.png"></div></td>');
      var col6 = $('<td><i class="fa fa-female"></i> <i class="fa fa-music"></i> <i class="fa fa-wheelchair"></i></td>');

      var col7 = $('<td>'+data['vehicle']['type']+'<div class="expandDetail">'+data['vehicle']['make']+' '+data['vehicle']['model']+' '+data['vehicle']['year']+'</div></td>')
      var col8 = $('<td>\
        <button type="button" ng-click="toggleInfo('+rowNumber+')" class="transparent-btn">\
          <span id="arrow" class="glyphicon glyphicon-chevron-down"></span>\
        </button>\
        <button type="button" class="btn btn-xs btn-join">Join</button>\
      </td>');

      row.append(col1).append(col2).append(col3).append(col4).append(col5).append(col6).append(col7).append(col8);
      table.append(row);
    }

    function populateSearchTable(results) {
      for (var idx = 0; idx < results['result'].length; idx++) {
        createResultEntry(results['result'][idx], idx+1);
      }
    }

    $scope.doQuery = function() {
      // clear previous search results
      $("[id^=row]").remove();

      // build search query, hardcoded url to local host (need to change)
      var pickup = $('#pickup').val();
      pickup = pickup.split(' ').join('+');
      var dropoff = $('#dropoff').val();
      dropoff = dropoff.split(' ').join('+');
      var url = "http://localhost:9000/query";
      url += "?pickup=" + pickup + "&dropoff=" + dropoff;
      //console.log(url);

      // restful call to get search results
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
    };

    $scope.toggleInfo = function(row) {
      // handle the arrow and determine if expanding or minimizing
      var rowElement = $("#row" + row);
      var arrowElement = $(rowElement.find("#arrow"));
      if (arrowElement.hasClass("glyphicon-chevron-down")) { 
        arrowElement.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        var expanding = true;
      } else {
        arrowElement.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        var expanding = false;
      }

      // handle the content to toggle
      var toToggle = $(rowElement.find(".expandDetail"));
      console.log(toToggle);
      for (var content = 0; content < toToggle.length; content++) {
        $(toToggle[content]).toggle();
        console.log(toToggle[content]);
      }
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
