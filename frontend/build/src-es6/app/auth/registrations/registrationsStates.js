import {State} from 'stateInjector';
export class RegistrationsState {
  constructor() {
    this.url = '^/sign-up';
    this.controller = 'RegistrationsCtrl';
    this.templateUrl = 'auth/registrations/registrations.tpl.html';
  }
}
Object.defineProperty(RegistrationsState, "annotations", {get: function() {
    return [new State('root.inner.registrations')];
  }});
export class RegistrationsSuccessState {
  constructor() {
    this.url = '^/signed-up';
    this.templateUrl = 'auth/registrations/registrations-success.tpl.html';
  }
}
Object.defineProperty(RegistrationsSuccessState, "annotations", {get: function() {
    return [new State('root.inner.registrationsSuccess')];
  }});
