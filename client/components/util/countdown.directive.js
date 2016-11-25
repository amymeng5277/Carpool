'use strict';

angular.module('uwece651f16NewApp')
  .directive('countDown', ['$interval',
    function ($interval) {
      // return the directive link function. (compile function not needed)
      return function (scope, element, attrs) {
        var f_datetime,  // date format
        stopTime; // so that we can cancel the time updates

        // used to update the UI
        function updateTime() {
          var now = moment().unix();
          var f_datetimestamp = moment(scope.t.f_datetime).unix();
          var duration = 0;
          if (now < f_datetimestamp) {
            duration = f_datetimestamp - now;
          }
          console.log(duration);
          var str_count_down = moment.duration(duration, 'seconds').humanize();
          element.text(str_count_down);
        }

        stopTime = $interval(updateTime, 1000);

        // listen on DOM destroy (removal) event, and cancel the next UI update
        // to prevent updating time after the DOM element was removed.
        element.on('$destroy', function () {
          $interval.cancel(stopTime);
        });
      }
    }]);
