#!/usr/bin/env node

// Adds the cordova plugins after running a "platform add"

var sys = require('sys');
var exec = require('child_process').exec;

// List of plugins to  add
var plugins = [
  'com.ionic.keyboard@1.0.3',
  'com.megster.cordova.bluetoothserial@0.3.4',
  'org.apache.cordova.console@0.2.12',
  'org.apache.cordova.device@0.2.13',
  'org.apache.cordova.device-motion@0.2.11'
];

for (var c = 0; c < plugins.length; c++) {
  exec('ionic plugin add ' + plugins[c], function(error, stdout, stderr) {
    if (error !== null) {
      sys.print(stderr);
    } else {
      sys.print(stdout);
    }
  });
}
