/* Controller for the controller with two vertical pads */
Controllers.controller('twoY', function($scope) {
  $scope.y = 0;
  $scope.x = 0;


  $scope.sayHi = function() {
    alert('saying hi!!!');
  };

  $scope.dragSteerer = function() {
    $scope.y = drag_position(event);
  };

  $scope.dragAccellerator = function() {
    $scope.x = drag_position(event);
  };


  function drag_position(event) {
    /* Returns the position of the touch in the div, normalized to -127--128
     * TODO
     */

    // TODO: Only calculate this once
    var height = event.target.clientHeight;

    console.log('height?:' + height);

    console.log(event.gesture.center, event.gesture.deltaX);

    var position = Math.round((-256 * event.gesture.center.pageY / height) + 128);
    // just to be safe make sure we return a value within -127 -- 128
    var position_truncated = Math.max(-127, Math.min(128, position));

    return position_truncated;
  }

});
