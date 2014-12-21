/* Controller for the controller with two vertical pads */
Controllers.controller('twoY', function($scope, $ionicGesture) {

  $scope.position = {x: 0, y: 0};

  var steerers = angular.element(document.querySelector('.y-controller'));

  // Need to do this to get touch to work properly :/
  function preventDefault(evt) {
    evt.preventDefault();
  }
  $ionicGesture.on('touchstart', preventDefault, steerers);
  $ionicGesture.on('touchmove', preventDefault, steerers);
  $ionicGesture.on('touchend', preventDefault, steerers);


  var steerer_div = angular.element(document.querySelector('.steerer'));
  var accelerator_div = angular.element(document.querySelector('.accelerator'));

  $ionicGesture.on('touchstart', function(evt) {
    console.log('touchstart!', evt);
  },
  steerer_div);
  $ionicGesture.on('touchmove', _.partial(touchmove_callback, 'x'), steerer_div);
  $ionicGesture.on('touchmove', _.partial(touchmove_callback, 'y'), accelerator_div);

  $scope.sayHi = function() {
    alert('saying hi!!!');
  };

  function echoPosition() {
    console.log($scope.position);
  }

  function touchmove_callback(dimension, evt) {
    /** dimension: 'x' or 'y' */

    evt.preventDefault();
    var position = drag_position(evt);
    console.log('setting ' + dimension + ' to: ' + position);

    $scope.$apply(function() {
      $scope.position[dimension] = position;
    });

    return false;
  }

  function touchrelease_callback(dimension, evt) {
    console.log('released:', evt);
  }

  function drag_position(evt) {
    /* Returns the position of the touch in the div, normalized to -127--128
     * TODO
     */

    // TODO: Only calculate this once
    var height = evt.target.clientHeight;

    // all the touches in the element
    var touches = evt.targetTouches;
    var c;
    var touch_sum = 0;

    for (c = 0; c < touches.length; c++) {
      touch_sum += touches[c].pageY;
    }
    var screen_position = touch_sum / touches.length;

    var position = Math.round((-256 * screen_position / height) + 128);
    // just to be safe make sure we return a value within -127 -- 128
    var position_truncated = Math.max(-127, Math.min(128, position));

    return position_truncated;
  }
});
