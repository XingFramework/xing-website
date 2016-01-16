import {Controller} from 'a1atscript';
export default function SessionsController($scope, $auth, $state, $xngToast, Serializer, authConfig, Inflector) {
  $scope.session = {password: ''};
  $scope.session[authConfig.authKey] = '';
  $scope.authKey = authConfig.authKey;
  $scope.humanAuthKey = Inflector.humanize(authConfig.authKey);
  $scope.passwordShow = authConfig.recoverable;
  $scope.sessionSubmit = function() {
    var serializer = new Serializer();
    $auth.submitLogin(serializer.serialize({user: $scope.session})).then(function(resp) {
      $state.go('root.inner.sessionsSuccess');
    }).catch(function(resp) {
      $xngToast.error(resp.errors);
    });
  };
}
Object.defineProperty(SessionsController, "annotations", {get: function() {
    return [new Controller('SessionsCtrl', ['$scope', '$auth', '$state', '$xngToast', 'Serializer', 'authConfig', 'Inflector'])];
  }});
