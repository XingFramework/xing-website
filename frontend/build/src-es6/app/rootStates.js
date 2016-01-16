import {State} from 'stateInjector';
export class RootState {
  constructor() {
    this.templateUrl = "root.tpl.html";
    this.controller = 'RootCtrl';
    this.abstract = true;
    this.url = "/";
  }
}
Object.defineProperty(RootState, "annotations", {get: function() {
    return [new State('root')];
  }});
export class RootInnerState {
  constructor() {
    this.templateUrl = "inner.tpl.html";
    this.abstract = true;
    this.url = "inner";
  }
}
Object.defineProperty(RootInnerState, "annotations", {get: function() {
    return [new State('root.inner')];
  }});
