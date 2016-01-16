import {State,
  Resolve} from 'stateInjector';
import {AdminOnlyState,
  TrackAdminState} from 'stateClasses';
export class HomepageState extends TrackAdminState {
  constructor() {
    super();
    this.controller = 'HomepageCtrl';
    this.templateUrl = 'homepage/homepage.tpl.html';
    this.abstract = true;
    this.url = 'home';
  }
}
Object.defineProperty(HomepageState, "annotations", {get: function() {
    return [new State('root.homepage')];
  }});
export class HomepageShowState {
  constructor() {
    this.url = '';
    this.controller = 'HomepageShowCtrl';
    this.templateUrl = 'homepage/homepage-show.tpl.html';
  }
}
Object.defineProperty(HomepageShowState, "annotations", {get: function() {
    return [new State('root.homepage.show')];
  }});
