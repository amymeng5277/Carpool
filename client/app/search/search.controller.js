'use strict';

(function() {

class SearchController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];
    $scope.bigTotalItems = 64;
    $scope.bigCurrentPage = 1;
    $scope.numPages = 10;
    $scope.maxSize = 5;

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
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
