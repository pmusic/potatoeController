/* Controller for configuration page */
Controllers.controller('config', function($scope, Settings) {

  $scope.address = Settings.getAddress();

  $scope.addressChange = function() {
    Settings.setAddress($scope.address);
  };

});
