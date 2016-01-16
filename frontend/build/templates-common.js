angular.module('templates-common', ['components/adminOnly/admin-only.tpl.html', 'components/sessionLinks/session-links.tpl.html']);

angular.module("components/adminOnly/admin-only.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/adminOnly/admin-only.tpl.html",
    "<div ng-if=\"adminOnly.showAdmin\">\n" +
    "  <div ng-transclude>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/sessionLinks/session-links.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/sessionLinks/session-links.tpl.html",
    "<ul class=\"session-links\">\n" +
    "  <li ng-hide=\"xngSessionLinks.isLoggedIn\"><a ui-sref='root.inner.registrations'>Sign Up</a></li>\n" +
    "  <li ng-hide=\"xngSessionLinks.isLoggedIn\"><a ui-sref='root.inner.sessions'>Sign In</a></li>\n" +
    "  <li ng-show=\"xngSessionLinks.isLoggedIn\"><a xng-sign-out>Sign Out</a></li>\n" +
    "</ul>\n" +
    "");
}]);
