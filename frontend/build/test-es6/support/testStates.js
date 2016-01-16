import {appName} from 'config';
angular.module(`${appName}.testStates`, ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('root', {
    abstract: true,
    template: '<ui-view/>'
  }).state('root.inner', {
    abstract: true,
    template: '<ui-view/>'
  });
}]);
