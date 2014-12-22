app.factory('Sender', function () {

  var timer = null,
    timer_interval = 500,
    position = {x: 0, y: 0};

  var Sender = {
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
    }

  };

  return Sender;
});
