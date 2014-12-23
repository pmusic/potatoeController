app.factory('Settings', function () {

  // keys for stuff stored in localStorage
  var POTATOE_ADDRESS_KEY = 'potatoe_address_key';

  var Settings = {
    setAddress: function(address) {
      localStorage.setItem(POTATOE_ADDRESS_KEY, address);
    },

    getAddress: function() {
      return localStorage.getItem(POTATOE_ADDRESS_KEY);
    }
  };

  return Settings;
});
