import SignOut from 'components/signOut/signOut.js';
import {Module,
  Component,
  Template} from 'a1atscript';
import OnLoginDirective from 'components/OnLoginDirective/OnLoginDirective.js';
export default class SessionLinks extends OnLoginDirective {
  onLogin(user) {
    this.isLoggedIn = true;
  }
  onLogout() {
    this.isLoggedIn = false;
  }
}
Object.defineProperty(SessionLinks, "annotations", {get: function() {
    return [new Module('sessionLinks', ['ng-token-auth', SignOut]), new Component({
      selector: 'xngSessionLinks',
      services: ['$rootScope', '$auth']
    }), new Template({url: 'components/sessionLinks/session-links.tpl.html'})];
  }});
