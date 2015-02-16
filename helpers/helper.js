var http   = require('http'),
    crypto = require('crypto'),
    fs     = require('fs'),
    os = require('os');

module.exports = {
	getconf: function(conf){
        if (process.env.NODE_ENV) {
            return conf[process.env.NODE_ENV];
        } else {
          console.log('Error: Missing NODE_ENV.  Set NODE_ENV variable to dev or prod');
          return null;
        }
    },
    gethostname: function(){
      sysinfo = {};

      var interfaces = os.networkInterfaces();
      var addresses = [];
      for (k in interfaces) {
          for (k2 in interfaces[k]) {
              var address = interfaces[k][k2];
              if (address.family == 'IPv4' && !address.internal) {
                  addresses.push(address.address)
              }
          }
      }

      sysinfo.hostname = os.hostname();
      if (addresses != undefined)
          sysinfo.ip = addresses[0]; 
      return sysinfo;
    }
}