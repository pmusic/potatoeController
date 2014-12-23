/* Controller for configuration page */
Controllers.controller('config', function($scope, Sender) {

  $scope.address = Sender.getAddress();

  $scope.addressChange = function() {
    Sender.setAddress($scope.address);
  };

});
