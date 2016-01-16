import {Module,
  Component,
  Template} from 'a1atscript';
import OnLoginDirective from 'components/OnLoginDirective/OnLoginDirective.js';
export default class AdminOnly extends OnLoginDirective {
  onLogout() {
    this.showAdmin = false;
  }
  onLogin(user) {
    this.showAdmin = true;
  }
}
Object.defineProperty(AdminOnly, "annotations", {get: function() {
    return [new Module('adminOnly', ['ng-token-auth']), new Component({
      selector: 'adminOnly',
      services: ['$rootScope', '$auth'],
      transclude: true
    }), new Template({url: 'components/adminOnly/admin-only.tpl.html'})];
  }});
