'use strict';

(function() {

class SearchController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

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

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('uwece651f16NewApp')
  .controller('SearchController', SearchController);

})();
