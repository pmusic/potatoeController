app.factory('Sender', function (Settings) {


  var timer = null,
    timer_interval = 1000 / 10, // ten times per second
    position = {x: 0, y: 0},
    connected = false,
    DELIMITER = 0x7e;

  var Sender = {

    connect: function() {
      /* Connect to Potatoe over bluetooth.
       * Returns a promise */

      var promise = new Promise(function(resolve, reject) {
        var uuid = Settings.getAddress();
        if(!uuid) {
          connected = false;
          reject('Potatoe address not set. Set on config page');
          return;
        }

        bluetoothSerial.isEnabled(function bt_enabled_success() {

          bluetoothSerial.connect(uuid, function bt_connect_success() {
            connected = true;
            resolve();
          }, function bt_connect_failure(err) {
            connected = false;
            console.log(err);
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

    disconnect: function() {
      /* disconnect from the robot */
      bluetoothSerial.disconnect(function(){
        connected = false;
      });
    },

    is_connected: function() {
      /* Returns whether we are connected to Potatoe */
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
      /* Send a message to Potatoe */
      //console.log('sending: ', position);
      //TODO
      var send_array = [];
      send_array[0] = DELIMITER;

      // command
      send_array[1] = 0; //

      // command value; two bytes
      send_array[2] = 0;
      send_array[3] = 0;

      // lazy escape of delimiter -- just add one
      send_array[4] = position.x === DELIMITER ? DELIMITER + 1 : position.x;
      send_array[5] = position.y === DELIMITER ? DELIMITER + 1 : position.y;

      bluetoothSerial.write(send_array, function(){
        /* success noop */
      }, 
      function(e){
        console.log('error sending message', e, send_array);
        Sender.stopSending();
      });
    },

    list_paired_devices: function() {
      /* for debugging */
      bluetoothSerial.list(function(list) {
        console.log('Linked devices:', list);
      },
      function(er) {
        console.log('Errror getting list of attached devices', err);
      });
    },

    isConnected: function() {
      bluetoothSerial.isConnected(function() {
        console.log('Yes, I am connected');
      }, function() {
        console.log('No, I am NOT connected');
      });

    }
  };

  window.SENDER = Sender;

  return Sender;
});
