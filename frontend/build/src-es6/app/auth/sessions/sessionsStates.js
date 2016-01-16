import {State,
  Resolve} from 'stateInjector';
import {LoggedInOnlyState} from 'stateClasses';
export class SessionsState {
  constructor() {
    this.url = '^/sign-in';
    this.controller = 'SessionsCtrl';
    this.templateUrl = 'auth/sessions/sessions.tpl.html';
  }
}
Object.defineProperty(SessionsState, "annotations", {get: function() {
    return [new State('root.inner.sessions')];
  }});
export class SessionsSuccessState extends LoggedInOnlyState {
  constructor() {
    super();
    this.url = '^/signed-in';
    this.templateUrl = 'auth/sessions/sessions-success.tpl.html';
  }
}
Object.defineProperty(SessionsSuccessState, "annotations", {get: function() {
    return [new State('root.inner.sessionsSuccess')];
  }});
