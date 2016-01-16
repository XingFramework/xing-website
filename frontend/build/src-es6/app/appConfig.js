import {Config} from 'a1atscript';
import {whenGoto} from 'xing-frontend-utils';
export default function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.when(/.*/, ['$location', whenGoto]);
  $urlRouterProvider.otherwise(($injector, $location) => {
    $injector.get('$state').go('root.homepage.show');
  });
}
Object.defineProperty(appConfig, "annotations", {get: function() {
    return [new Config('$stateProvider', '$urlRouterProvider', '$locationProvider')];
  }});
