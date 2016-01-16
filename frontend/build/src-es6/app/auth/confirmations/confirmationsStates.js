import {State} from "stateInjector";
import {LoggedInOnlyState} from "stateClasses";
export class ConfirmationsSuccessState extends LoggedInOnlyState {
  constructor() {
    super();
    this.url = '^/confirmed';
    this.templateUrl = 'auth/confirmations/confirmations-success.tpl.html';
  }
}
Object.defineProperty(ConfirmationsSuccessState, "annotations", {get: function() {
    return [new State('root.inner.confirmationsSuccess')];
  }});
