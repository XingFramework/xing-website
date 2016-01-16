import {Controller} from 'a1atscript';
export default function RootCtrl($scope, $state, $rootScope, $window) {
  $rootScope.$on("$viewContentLoaded", function(event) {
    $window.frontendContentLoaded = true;
  });
}
Object.defineProperty(RootCtrl, "annotations", {get: function() {
    return [new Controller('RootCtrl', ['$scope', '$state', '$rootScope', '$window'])];
  }});
