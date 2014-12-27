/* Controller for the controller with two vertical pads */
Controllers.controller('tilt', function($scope, Sender) {

  var timer = null,
    interval = 1000;

  $scope.position = {
    x: 0,
    y: 0
  };

  $scope.on = function() {
    console.log('pad on');

    timer = navigator.accelerometer.watchAcceleration(function(acc) {
      $scope.$apply(function() {

        $scope.position.x = acc.x;
        $scope.position.y = acc.y;
        console.log('and Z is:' + acc.z);
      });
    }, function() {
      console.log('Could not get acceleration');
    },
    {
      frequency: interval
    });
  };

  $scope.off = function() {
    console.log('pad off');
    navigator.accelerometer.clearWatch(timer);
  };

});
