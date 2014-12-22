/* Controller for the controller with two vertical pads */
Controllers.controller('twoY', function($scope, $ionicGesture, Sender) {

  $scope.position = {x: 0, y: 0};
  $scope.sending = false;

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

  $ionicGesture.on('touchmove', _.partial(touchmove_callback, 'x'), steerer_div);
  $ionicGesture.on('touchmove', _.partial(touchmove_callback, 'y'), accelerator_div);

  $ionicGesture.on('touchstart', _.partial(touchmove_callback, 'x'), steerer_div);
  $ionicGesture.on('touchstart', _.partial(touchmove_callback, 'y'), accelerator_div);

  $ionicGesture.on('touchend', _.partial(touchend_callback, 'x'), steerer_div);
  $ionicGesture.on('touchend', _.partial(touchend_callback, 'y'), accelerator_div);

  $scope.sayHi = function() {
    alert('saying hi!!!');
  };

  $scope.toggleSending = function() {
    console.log('toggleSending. arguments: ', arguments);
    if ($scope.sending) {
      Sender.startSending();
    } else {
      Sender.stopSending();
    }
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

  function touchend_callback(dimension, evt) {
    if (evt.targetTouches.length === 0) {
      console.log('No more touches. Setting ' + dimension + ' to 0');
      $scope.$apply(function() {
        $scope.position[dimension] = 0;
      });
    }
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
