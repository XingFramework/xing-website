import {backendUrl} from 'config';
import Sessions from './sessions/sessions.js';
import Registrations from './registrations/registrations.js';
import Confirmations from './confirmations/confirmations.js';
import Passwords from './passwords/passwords.js';
import AuthConfig from './config.js';
import {Config,
  Module} from 'a1atscript';
function authSetup($authProvider, authConfigProvider) {
  var location = window.location.href;
  var confirmationLocation = new URL(location);
  confirmationLocation.pathname = "/confirmed";
  confirmationLocation.search = "";
  var passwordResetSuccessLocation = new URL(location);
  passwordResetSuccessLocation.pathname = "/update-password";
  passwordResetSuccessLocation.search = "";
  var storageType = 'localStorage';
  try {
    localStorage.setItem("mod", "mod");
    localStorage.removeItem("mod");
  } catch (e) {
    storageType = 'cookies';
  }
  $authProvider.configure({
    apiUrl: backendUrl,
    tokenValidationPath: 'users/validate_token',
    signOutUrl: 'users/sign_out',
    emailRegistrationPath: 'users',
    accountUpdatePath: 'users',
    accountDeletePath: 'users',
    passwordResetPath: 'users/password',
    passwordUpdatePath: 'users/password',
    emailSignInPath: 'users/sign_in',
    storage: storageType,
    confirmationSuccessUrl: confirmationLocation.toString(),
    passwordResetSuccessUrl: passwordResetSuccessLocation.toString()
  });
  authConfigProvider.authKey("email");
  authConfigProvider.enableRecovery();
}
Object.defineProperty(authSetup, "annotations", {get: function() {
    return [new Config('$authProvider', 'authConfigProvider')];
  }});
var authModule = new Module('auth', ['ng-token-auth', Sessions, Registrations, Confirmations, Passwords, AuthConfig, authSetup]);
export default authModule;
