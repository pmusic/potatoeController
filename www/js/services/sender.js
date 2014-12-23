app.factory('Sender', function () {

  // keys for stuff stored in localStorage
  var POTATOE_ADDRESS_KEY = 'potatoe_address_key';

  var timer = null,
    timer_interval = 500,
    position = {x: 0, y: 0},
    connected = false;

  var Sender = {

    connect: function() {
      /* Connect to Potatoe over bluetooth.
       * Returns a promise */

      var promise = new Promise(function(resolve, reject) {
        var uuid = Sender.getAddress();
        if(!uuid) {
          connected = false;
          reject('Potatoe address not set. Set on config page');
          return;
        }

        bluetoothSerial.isEnabled(function bt_enabled_success() {

          blueToothSerial.connect(uuid, function bt_connect_success() {
            connected = true;
            resolve();
          }, function bt_connect_failure() {
            connected = false;
            reject('Could not connect using uuid ' + uuid);
          });

        },
        function bt_enabled_failure() {
          connected = false;
          reject('Bluetooth is not on');
        });

      });

      return promise;
    },

    is_connected: function() {
      return connected;
    },

    startSending: function(ms) {
      console.log('starting sending!');

      // clear the timer, just in case an old one still exists
      window.clearInterval(timer);

      timer = window.setInterval(Sender.send, timer_interval);
    },

    setControl: function(p) {
      position = p;
    },

    stopSending: function() {
      // zero the controls and send to Potatoe
      position = {x: 0, y: 0};
      Sender.send();
      window.clearInterval(timer);
    },

    send: function() {
      console.log('sending: ', position);
      //TODO
    },

    setAddress: function(address) {
      localStorage.setItem(POTATOE_ADDRESS_KEY, address);
    },

    getAddress: function() {
      return localStorage.getItem(POTATOE_ADDRESS_KEY);
    }
  };

  return Sender;
});
