import {Provider,
  Module} from 'a1atscript';
export default function authConfig() {
  var config = {
    authKey: "email",
    recoverable: false
  };
  this.authKey = function(name) {
    config.authKey = name;
  };
  this.enableRecovery = function() {
    config.recoverable = true;
  };
  this.$get = [function authKey() {
    return config;
  }];
}
Object.defineProperty(authConfig, "annotations", {get: function() {
    return [new Module('auth.config'), new Provider('authConfig')];
  }});
