// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('potatoeControl', ['ionic', 'potatoeController.controllers']);

app.config(function($stateProvider, $ionicConfigProvider) {

  $stateProvider.state('config', {
    url: '/config',
    views: {
      config: {
        templateUrl: 'templates/config.html'
      }
    }

  })
  .state('twoy', {
    url: '/twoy',
    views: {
      twoy: {
        templateUrl: 'templates/controller.html'
      }
    }
  });

  // Put android tabs at the bottom
  $ionicConfigProvider.platform.android.tabs.position("bottom");

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

var Controllers = angular.module('potatoeController.controllers',[]);
