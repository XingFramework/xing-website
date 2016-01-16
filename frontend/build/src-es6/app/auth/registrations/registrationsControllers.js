import {Controller} from 'a1atscript';
export default function RegistrationsController($scope, $auth, $state, $xngToast, Serializer) {
  $scope.registration = {
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: ''
  };
  $scope.registrationSubmit = function() {
    var serializer = new Serializer();
    $auth.submitRegistration(serializer.serialize({user: $scope.registration})).then(function(resp) {
      $state.go('root.inner.registrationsSuccess');
    }).catch(function(resp) {
      $xngToast.errorList(resp.data.errors, "We cannot process your registration because:");
    });
  };
}
Object.defineProperty(RegistrationsController, "annotations", {get: function() {
    return [new Controller('RegistrationsCtrl', ['$scope', '$auth', '$state', '$xngToast', 'Serializer'])];
  }});
