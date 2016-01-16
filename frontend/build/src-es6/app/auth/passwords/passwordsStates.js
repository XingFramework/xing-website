import {State,
  Resolve} from 'stateInjector';
import {LoggedInOnlyState} from 'stateClasses';
export class PasswordsRequestState {
  constructor() {
    this.url = '^/reset-password';
    this.controller = 'PasswordsRequestCtrl';
    this.templateUrl = 'auth/passwords/passwords-request.tpl.html';
  }
}
Object.defineProperty(PasswordsRequestState, "annotations", {get: function() {
    return [new State('root.inner.passwordsRequest')];
  }});
export class PasswordsRequestSuccessState {
  constructor() {
    this.url = '^/reset-password-sent';
    this.templateUrl = 'auth/passwords/passwords-request-success.tpl.html';
  }
}
Object.defineProperty(PasswordsRequestSuccessState, "annotations", {get: function() {
    return [new State('root.inner.passwordsRequestSuccess')];
  }});
export class PasswordsUpdateState extends LoggedInOnlyState {
  constructor() {
    super();
    this.url = '^/update-password';
    this.controller = 'PasswordsUpdateCtrl';
    this.templateUrl = 'auth/passwords/passwords-update.tpl.html';
  }
}
Object.defineProperty(PasswordsUpdateState, "annotations", {get: function() {
    return [new State('root.inner.passwordsUpdate')];
  }});
export class PasswordsUpdateSuccessState extends LoggedInOnlyState {
  constructor() {
    super();
    this.url = '^/updated-password';
    this.templateUrl = 'auth/passwords/passwords-update-success.tpl.html';
  }
}
Object.defineProperty(PasswordsUpdateSuccessState, "annotations", {get: function() {
    return [new State('root.inner.passwordsUpdateSuccess')];
  }});
