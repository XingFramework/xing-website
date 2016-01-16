import {Module,
  DirectiveObject} from 'a1atscript';
export default class SignOut {
  constructor($state, $auth) {
    this.$state = $state;
    this.$auth = $auth;
    this.restrict = 'A';
  }
  link(scope, element, attrs) {
    element.on('click', () => {
      this.$auth.signOut().then((response) => {
        this.$state.go('root.homepage.show');
      });
    });
  }
}
Object.defineProperty(SignOut, "annotations", {get: function() {
    return [new Module('signOutDirective', ['ng-token-auth', 'ui.router.state']), new DirectiveObject('xngSignOut', ['$state', '$auth'])];
  }});
