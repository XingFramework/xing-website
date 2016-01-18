angular.module('templates-app', ['auth/confirmations/confirmations-success.tpl.html', 'auth/passwords/passwords-request-success.tpl.html', 'auth/passwords/passwords-request.tpl.html', 'auth/passwords/passwords-update-success.tpl.html', 'auth/passwords/passwords-update.tpl.html', 'auth/registrations/registrations-success.tpl.html', 'auth/registrations/registrations.tpl.html', 'auth/sessions/sessions-success.tpl.html', 'auth/sessions/sessions.tpl.html', 'homepage/homepage-show.tpl.html', 'homepage/homepage.tpl.html', 'inner.tpl.html', 'root.tpl.html']);

angular.module("auth/confirmations/confirmations-success.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/confirmations/confirmations-success.tpl.html",
    "<h2>Your email address has been successfully confirmed.</h2>");
}]);

angular.module("auth/passwords/passwords-request-success.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/passwords/passwords-request-success.tpl.html",
    "<h1>Password reset email sent!</h1>\n" +
    "\n" +
    "<p>Please check your email.  Within a few minutes you receive an email with instructions on how to reset your password.</p>\n" +
    "");
}]);

angular.module("auth/passwords/passwords-request.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/passwords/passwords-request.tpl.html",
    "<h1>Forgot your password?</h1>\n" +
    "\n" +
    "<p>Enter your email address below to receive a new confirmation email.</p>\n" +
    "\n" +
    "<form id='passwords-request-form'>\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"email\">Email:</label>\n" +
    "      <input name=\"email\" ng-model=\"passwordRequest.email\" placeholder=\"Email\" />\n" +
    "      <span class='comment'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <button type=\"submit\" ng-click=\"passwordRequestSubmit()\" class=\"call-to-action\">Send password reset instructions</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>\n" +
    "");
}]);

angular.module("auth/passwords/passwords-update-success.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/passwords/passwords-update-success.tpl.html",
    "<h1>Password Updated</h1>\n" +
    "\n" +
    "<p>Your password has been changed successfully.</p>\n" +
    "");
}]);

angular.module("auth/passwords/passwords-update.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/passwords/passwords-update.tpl.html",
    "<h1>Reset Your Password</h1>\n" +
    "\n" +
    "<form id='passwords-update-form'>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"password\">New Password:</label>\n" +
    "      <input type=\"password\" name=\"password\" ng-model=\"passwordUpdate.password\" placeholder=\"New Password\" />\n" +
    "      <span class='comment'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"password-confirmation\">Confirm New Password:</label>\n" +
    "      <input type=\"password\" name=\"password-confirmation\" ng-model=\"passwordUpdate.passwordConfirmation\" placeholder=\"New Password\" />\n" +
    "      <span class='comment'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <button type=\"submit\" ng-click=\"passwordUpdateSubmit()\" class='call-to-action'>Update Password</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>\n" +
    "");
}]);

angular.module("auth/registrations/registrations-success.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/registrations/registrations-success.tpl.html",
    "<h2>A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.</h2>");
}]);

angular.module("auth/registrations/registrations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/registrations/registrations.tpl.html",
    "<h1>Sign Up</h1>\n" +
    "\n" +
    "<form id='registrations-form'>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"email\">Email:</label>\n" +
    "      <input name=\"email\" ng-model=\"registration.email\" placeholder=\"Email\" />\n" +
    "      <span class='comment'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"email-confirmation\">Email Confirmation:</label>\n" +
    "      <input name=\"email-confirmation\" ng-model=\"registration.emailConfirmation\" placeholder=\"Email Confirmation\" />\n" +
    "      <span class='comment'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"password\">Password:</label>\n" +
    "      <input type=\"password\" name=\"password\" ng-model=\"registration.password\" placeholder=\"Password\" />\n" +
    "      <span class='comment'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"password-confirmation\">Password Confirmation:</label>\n" +
    "      <input type=\"password\" name=\"password-confirmation\" ng-model=\"registration.passwordConfirmation\" placeholder=\"Password Confirmation\" />\n" +
    "      <span class='comment'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <button type=\"submit\" ng-click=\"registrationSubmit()\" class='call-to-action'>Sign Up</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <a ui-sref='root.inner.sessions'  class='input-like'>Already have an account?</a>\n" +
    "    </div>\n" +
    "\n" +
    "</form>\n" +
    "");
}]);

angular.module("auth/sessions/sessions-success.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/sessions/sessions-success.tpl.html",
    "<h1>You have successfully logged in!</h1>");
}]);

angular.module("auth/sessions/sessions.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/sessions/sessions.tpl.html",
    "<h1>Sign In</h1>\n" +
    "\n" +
    "<form id='sessions-form'>\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"{{authKey}}\">{{humanAuthKey}}:</label>\n" +
    "      <input name=\"{{authKey}}\" ng-model=\"session[authKey]\" placeholder=\"{{humanAuthKey}}\" required />\n" +
    "      <span class='messages'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <label for=\"password\">Password:</label>\n" +
    "      <input type=\"password\" name=\"password\" ng-model=\"session.password\" placeholder=\"Password\" required />\n" +
    "      <span class='messages'></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <button type=\"submit\" ng-click=\"sessionSubmit()\" class=\"call-to-action\">Sign In</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='xng-form-row'>\n" +
    "      <div ng-if=\"passwordShow\" class='input-like'>\n" +
    "        <a ui-sref='root.inner.passwordsRequest'>Forgot your password?</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("homepage/homepage-show.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("homepage/homepage-show.tpl.html",
    "<h1>Xing Homepage</h1>\n" +
    "<p>This will be the home page of whatever project is based on Xing. er</p>\n" +
    "");
}]);

angular.module("homepage/homepage.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("homepage/homepage.tpl.html",
    "<!-- <xng-responsive-menu>\n" +
    "  <a ui-sref='root.inner.homepage'>Homepage</a>\n" +
    "  <xng-session-links>\n" +
    "  </xng-session-links>\n" +
    "</xng-responsive-menu> -->\n" +
    "\n" +
    "<ui-view xng-state-attrs></ui-view>\n" +
    "\n" +
    "<!-- <footer>\n" +
    "  <span id=\"copyright\">&copy; 2016 Your Organization Here</span>\n" +
    "  <a ui-sref='root.inner.sessions' id='sign-in-link'>Sign In</a>\n" +
    "  <a href='#' xng-unimplemented>Demo Unimplemented Feature</a>\n" +
    "</footer> -->\n" +
    "");
}]);

angular.module("inner.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("inner.tpl.html",
    "<!-- <xng-responsive-menu>\n" +
    "  <xng-navbar id=\"main_nav\" menu=\"mainMenu\">\n" +
    "  </xng-navbar>\n" +
    "  <xng-session-links>\n" +
    "  </xng-session-links>\n" +
    "</xng-responsive-menu>\n" +
    "\n" +
    "<div id=\"toast_main\">\n" +
    "</div> -->\n" +
    "\n" +
    "<ui-view xng-state-attrs></ui-view>\n" +
    "\n" +
    "<!-- <footer>\n" +
    "  <span id=\"copyright\">&copy; 2016 Your Organization Here</span>\n" +
    "  <a ui-sref='root.inner.sessions' id='sign-in-link'>Sign In</a>\n" +
    "</footer> -->\n" +
    "");
}]);

angular.module("root.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("root.tpl.html",
    "<ui-view xng-state-attrs>\n" +
    "</ui-view>\n" +
    "");
}]);
