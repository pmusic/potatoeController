/* Controller for the controller with two vertical pads */
Controllers.controller('tilt', function($scope, Sender) {

  var timer = null,
    interval = 100,
    GRAVITY = 9.81;

  $scope.position = {
    x: 0,
    y: 0,
    z: 0
  };

  $scope.on = function() {
    console.log('pad on');
    // Forward/back value is calculated relative to the current position, so we 
    // save the value of the initial position in y_start.
    var y_start = null;

    timer = navigator.accelerometer.watchAcceleration(function(acc) {
      $scope.$apply(function() {
        if (y_start === null) {
          y_start = acc.y;
        }

        $scope.position.x = acc.x;
        $scope.position.y = acc.y;
        $scope.position.z = acc.z;
        //Sender.setControl($scope.position);
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
