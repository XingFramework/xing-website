(function() {
  angular.module('ng-token-auth', ['ngCookies']).provider('$auth', function() {
    var configs, defaultConfigName;
    configs = {
      "default": {
        apiUrl: '/api',
        signOutUrl: '/auth/sign_out',
        emailSignInPath: '/auth/sign_in',
        emailRegistrationPath: '/auth',
        accountUpdatePath: '/auth',
        accountDeletePath: '/auth',
        confirmationSuccessUrl: function() {
          return window.location.href;
        },
        passwordResetPath: '/auth/password',
        passwordUpdatePath: '/auth/password',
        passwordResetSuccessUrl: function() {
          return window.location.href;
        },
        tokenValidationPath: '/auth/validate_token',
        proxyIf: function() {
          return false;
        },
        proxyUrl: '/proxy',
        validateOnPageLoad: true,
        forceHardRedirect: false,
        storage: 'cookies',
        tokenFormat: {
          "access-token": "{{ token }}",
          "token-type": "Bearer",
          client: "{{ clientId }}",
          expiry: "{{ expiry }}",
          uid: "{{ uid }}"
        },
        parseExpiry: function(headers) {
          return (parseInt(headers['expiry'], 10) * 1000) || null;
        },
        handleLoginResponse: function(resp) {
          return resp.data;
        },
        handleAccountUpdateResponse: function(resp) {
          return resp.data;
        },
        handleTokenValidationResponse: function(resp) {
          return resp.data;
        },
        authProviderPaths: {
          github: '/auth/github',
          facebook: '/auth/facebook',
          google: '/auth/google_oauth2'
        }
      }
    };
    defaultConfigName = "default";
    return {
      configure: function(params) {
        var conf, defaults, fullConfig, i, j, k, label, len, v;
        if (params instanceof Array && params.length) {
          for (i = j = 0, len = params.length; j < len; i = ++j) {
            conf = params[i];
            label = null;
            for (k in conf) {
              v = conf[k];
              label = k;
              if (i === 0) {
                defaultConfigName = label;
              }
            }
            defaults = angular.copy(configs["default"]);
            fullConfig = {};
            fullConfig[label] = angular.extend(defaults, conf[label]);
            angular.extend(configs, fullConfig);
          }
          if (defaultConfigName !== "default") {
            delete configs["default"];
          }
        } else if (params instanceof Object) {
          angular.extend(configs["default"], params);
        } else {
          throw "Invalid argument: ng-token-auth config should be an Array or Object.";
        }
        return configs;
      },
      $get: [
        '$http', '$q', '$location', '$cookieStore', '$window', '$timeout', '$rootScope', '$interpolate', (function(_this) {
          return function($http, $q, $location, $cookieStore, $window, $timeout, $rootScope, $interpolate) {
            return {
              sequences: [],
              subSequence: 0,
              lastSequenceTime: null,
              header: null,
              dfd: null,
              user: {},
              mustResetPassword: false,
              listener: null,
              initialize: function() {
                this.initializeListeners();
                return this.addScopeMethods();
              },
              initializeListeners: function() {
                this.listener = this.handlePostMessage.bind(this);
                if ($window.addEventListener) {
                  return $window.addEventListener("message", this.listener, false);
                }
              },
              cancel: function(reason) {
                if (this.t != null) {
                  $timeout.cancel(this.t);
                }
                if (this.dfd != null) {
                  this.rejectDfd(reason);
                }
                return $timeout(((function(_this) {
                  return function() {
                    return _this.t = null;
                  };
                })(this)), 0);
              },
              destroy: function() {
                this.cancel();
                if ($window.removeEventListener) {
                  return $window.removeEventListener("message", this.listener, false);
                }
              },
              handlePostMessage: function(ev) {
                var error;
                if (ev.data.message === 'deliverCredentials') {
                  delete ev.data.message;
                  this.handleValidAuth(ev.data, true);
                  $rootScope.$broadcast('auth:login-success', ev.data);
                }
                if (ev.data.message === 'authFailure') {
                  error = {
                    reason: 'unauthorized',
                    errors: [ev.data.error]
                  };
                  this.cancel(error);
                  return $rootScope.$broadcast('auth:login-error', error);
                }
              },
              nextSequence: function() {
                var time = Date.now();
                if(time === this.lastSequenceTime){
                  this.subSequence++;
                } else {
                  this.subSequence = 0;
                }

                var sequence = time * 100 + this.subSequence; // some concern here: what if more than 100 reqs/ms?
                this.sequences.push(sequence);
                return sequence;
              },
              checkSequence: function(sequence){
                sequence = parseInt(sequence);
                if(sequence < this.sequences[0]){ return false; }
                while( this.sequences.length > 0 && sequence >= this.sequences[0] ){ this.sequences.shift(); }
                return true;
              },
              addScopeMethods: function() {
                $rootScope.user = this.user;
                $rootScope.authenticate = this.authenticate.bind(this);
                $rootScope.signOut = this.signOut.bind(this);
                $rootScope.destroyAccount = this.destroyAccount.bind(this);
                $rootScope.submitRegistration = this.submitRegistration.bind(this);
                $rootScope.submitLogin = this.submitLogin.bind(this);
                $rootScope.requestPasswordReset = this.requestPasswordReset.bind(this);
                $rootScope.updatePassword = this.updatePassword.bind(this);
                $rootScope.updateAccount = this.updateAccount.bind(this);
                if (this.getConfig().validateOnPageLoad) {
                  return this.validateUser({
                    config: this.getSavedConfig()
                  });
                }
              },
              submitRegistration: function(params, opts) {
                var successUrl;
                if (opts == null) {
                  opts = {};
                }
                successUrl = this.getResultOrValue(this.getConfig(opts.config).confirmationSuccessUrl);
                angular.extend(params, {
                  confirm_success_url: successUrl,
                  config_name: this.getCurrentConfigName(opts.config)
                });
                return $http.post(this.apiUrl(opts.config) + this.getConfig(opts.config).emailRegistrationPath, params).success(function(resp) {
                  return $rootScope.$broadcast('auth:registration-email-success', params);
                }).error(function(resp) {
                  return $rootScope.$broadcast('auth:registration-email-error', resp);
                });
              },
              submitLogin: function(params, opts) {
                if (opts == null) {
                  opts = {};
                }
                this.initDfd();
                $http.post(this.apiUrl(opts.config) + this.getConfig(opts.config).emailSignInPath, params).success((function(_this) {
                  return function(resp) {
                    var authData;
                    _this.setConfigName(opts.config);
                    authData = _this.getConfig(opts.config).handleLoginResponse(resp);
                    _this.handleValidAuth(authData);
                    return $rootScope.$broadcast('auth:login-success', _this.user);
                  };
                })(this)).error((function(_this) {
                  return function(resp) {
                    _this.rejectDfd(resp);
                    return $rootScope.$broadcast('auth:login-error', resp);
                  };
                })(this));
                return this.dfd.promise;
              },
              userIsAuthenticated: function() {
                return this.retrieveData('auth_headers') && this.user.signedIn;
              },
              requestPasswordReset: function(params, opts) {
                var successUrl;
                if (opts == null) {
                  opts = {};
                }
                successUrl = this.getResultOrValue(this.getConfig(opts.config).passwordResetSuccessUrl);
                params.redirect_url = successUrl;
                if (opts.config != null) {
                  params.config_name = opts.config;
                }
                return $http.post(this.apiUrl(opts.config) + this.getConfig(opts.config).passwordResetPath, params).success(function(resp) {
                  return $rootScope.$broadcast('auth:password-reset-request-success', params);
                }).error(function(resp) {
                  return $rootScope.$broadcast('auth:password-reset-request-error', resp);
                });
              },
              updatePassword: function(params) {
                return $http.put(this.apiUrl() + this.getConfig().passwordUpdatePath, params).success((function(_this) {
                  return function(resp) {
                    $rootScope.$broadcast('auth:password-change-success', resp);
                    return _this.mustResetPassword = false;
                  };
                })(this)).error(function(resp) {
                  return $rootScope.$broadcast('auth:password-change-error', resp);
                });
              },
              updateAccount: function(params) {
                return $http.put(this.apiUrl() + this.getConfig().accountUpdatePath, params).success((function(_this) {
                  return function(resp) {
                    angular.extend(_this.user, _this.getConfig().handleAccountUpdateResponse(resp));
                    return $rootScope.$broadcast('auth:account-update-success', resp);
                  };
                })(this)).error(function(resp) {
                  return $rootScope.$broadcast('auth:account-update-error', resp);
                });
              },
              destroyAccount: function(params) {
                return $http["delete"](this.apiUrl() + this.getConfig().accountUpdatePath, params).success((function(_this) {
                  return function(resp) {
                    _this.invalidateTokens();
                    return $rootScope.$broadcast('auth:account-destroy-success', resp);
                  };
                })(this)).error(function(resp) {
                  return $rootScope.$broadcast('auth:account-destroy-error', resp);
                });
              },
              authenticate: function(provider, opts) {
                if (opts == null) {
                  opts = {};
                }
                if (this.dfd == null) {
                  this.setConfigName(opts.config);
                  this.initDfd();
                  this.openAuthWindow(provider, opts);
                }
                return this.dfd.promise;
              },
              setConfigName: function(configName) {
                if (configName == null) {
                  configName = defaultConfigName;
                }
                return this.persistData('currentConfigName', configName, configName);
              },
              openAuthWindow: function(provider, opts) {
                var authUrl;
                authUrl = this.buildAuthUrl(provider, opts);
                if (this.useExternalWindow()) {
                  return this.requestCredentials(this.createPopup(authUrl));
                } else {
                  return this.visitUrl(authUrl);
                }
              },
              visitUrl: function(url) {
                return $window.location.replace(url);
              },
              buildAuthUrl: function(provider, opts) {
                var authUrl, key, ref, val;
                if (opts == null) {
                  opts = {};
                }
                authUrl = this.getConfig(opts.config).apiUrl;
                authUrl += this.getConfig(opts.config).authProviderPaths[provider];
                authUrl += '?auth_origin_url=' + encodeURIComponent($window.location.href);
                if (opts.params != null) {
                  ref = opts.params;
                  for (key in ref) {
                    val = ref[key];
                    authUrl += '&';
                    authUrl += encodeURIComponent(key);
                    authUrl += '=';
                    authUrl += encodeURIComponent(val);
                  }
                }
                return authUrl;
              },
              requestCredentials: function(authWindow) {
                if (authWindow.closed) {
                  this.cancel({
                    reason: 'unauthorized',
                    errors: ['User canceled login']
                  });
                  return $rootScope.$broadcast('auth:window-closed');
                } else {
                  authWindow.postMessage("requestCredentials", "*");
                  return this.t = $timeout(((function(_this) {
                    return function() {
                      return _this.requestCredentials(authWindow);
                    };
                  })(this)), 500);
                }
              },
              createPopup: function(url) {
                return $window.open(url);
              },
              resolveDfd: function() {
                this.dfd.resolve(this.user);
                return $timeout(((function(_this) {
                  return function() {
                    _this.dfd = null;
                    if (!$rootScope.$$phase) {
                      return $rootScope.$digest();
                    }
                  };
                })(this)), 0);
              },
              validateUser: function(opts) {
                var clientId, configName, token, uid;
                if (opts == null) {
                  opts = {};
                }
                configName = opts.config;
                if (this.dfd == null) {
                  this.initDfd();
                  if (!this.userIsAuthenticated()) {
                    if ($location.search().token !== void 0) {
                    var search = $location.search();
                    token = search.token;
                    clientId = search.client_id;
                    uid = search.uid;
                    configName = search.config;
                      this.setConfigName(configName);
                    this.mustResetPassword = search.reset_password;
                    this.firstTimeLogin = search.account_confirmation_success;
                      this.setAuthHeaders(this.buildAuthHeaders({
                        token: token,
                        clientId: clientId,
                        uid: uid
                      }));
                    delete search["token"];
                    delete search["uid"];
                    delete search["client_id"];
                    delete search["config"];
                    delete search["reset_password"];
                    delete search["account_confirmation_success"];
                    delete search["expiry"];

                    $location.search(search);
                    } else if (this.retrieveData('currentConfigName')) {
                      configName = this.retrieveData('currentConfigName');
                    }
                    if (!isEmpty(this.retrieveData('auth_headers'))) {
                      this.validateToken({
                        config: configName
                      });
                    } else {
                      this.rejectDfd({
                        reason: 'unauthorized',
                        errors: ['No credentials']
                      });
                      $rootScope.$broadcast('auth:invalid');
                    }
                  } else {
                    this.resolveDfd();
                  }
                }
                return this.dfd.promise;
              },
              validateToken: function(opts) {
                if (opts == null) {
                  opts = {};
                }
                if (!this.tokenHasExpired()) {
                  return $http.get(this.apiUrl(opts.config) + this.getConfig(opts.config).tokenValidationPath).success((function(_this) {
                    return function(resp) {
                      var authData;
                      authData = _this.getConfig(opts.config).handleTokenValidationResponse(resp);
                      _this.handleValidAuth(authData);
                      if (_this.firstTimeLogin) {
                        $rootScope.$broadcast('auth:email-confirmation-success', _this.user);
                      }
                      if (_this.mustResetPassword) {
                        $rootScope.$broadcast('auth:password-reset-confirm-success', _this.user);
                      }
                      return $rootScope.$broadcast('auth:validation-success', _this.user);
                    };
                  })(this)).error((function(_this) {
                    return function(data) {
                      if (_this.firstTimeLogin) {
                        $rootScope.$broadcast('auth:email-confirmation-error', data);
                      }
                      if (_this.mustResetPassword) {
                        $rootScope.$broadcast('auth:password-reset-confirm-error', data);
                      }
                      $rootScope.$broadcast('auth:validation-error', data);
                      return _this.rejectDfd({
                        reason: 'unauthorized',
                        errors: data.errors
                      });
                    };
                  })(this));
                } else {
                  return this.rejectDfd({
                    reason: 'unauthorized',
                    errors: ['Expired credentials']
                  });
                }
              },
              tokenHasExpired: function() {
                var expiry, now;
                expiry = this.getExpiry();
                now = new Date().getTime();
                if (this.retrieveData('auth_headers') && expiry) {
                  return expiry && expiry < now;
                } else {
                  return null;
                }
              },
              getExpiry: function() {
                return this.getConfig().parseExpiry(this.retrieveData('auth_headers'));
              },
              invalidateTokens: function() {
                var key, ref, val;
                ref = this.user;
                for (key in ref) {
                  val = ref[key];
                  delete this.user[key];
                }
                this.deleteData('currentConfigName');
                return this.deleteData('auth_headers');
              },
              signOut: function() {
                return $http["delete"](this.apiUrl() + this.getConfig().signOutUrl).success((function(_this) {
                  return function(resp) {
                    _this.invalidateTokens();
                    return $rootScope.$broadcast('auth:logout-success');
                  };
                })(this)).error((function(_this) {
                  return function(resp) {
                    _this.invalidateTokens();
                    return $rootScope.$broadcast('auth:logout-error', resp);
                  };
                })(this));
              },
              handleValidAuth: function(user, setHeader) {
                if (setHeader == null) {
                  setHeader = false;
                }
                if (this.t != null) {
                  $timeout.cancel(this.t);
                }
                angular.extend(this.user, user);
                this.user.signedIn = true;
                this.user.configName = this.getCurrentConfigName();
                if (setHeader) {
                  this.setAuthHeaders(this.buildAuthHeaders({
                    token: this.user.auth_token,
                    clientId: this.user.client_id,
                    uid: this.user.uid
                  }));
                }
                return this.resolveDfd();
              },
              buildAuthHeaders: function(ctx) {
                var headers, key, ref, val;
                headers = {};
                ref = this.getConfig().tokenFormat;
                for (key in ref) {
                  val = ref[key];
                  headers[key] = $interpolate(val)(ctx);
                }
                return headers;
              },
              persistData: function(key, val, configName) {
                switch (this.getConfig(configName).storage) {
                  case 'localStorage':
                    return $window.localStorage.setItem(key, JSON.stringify(val));
                  default:
                    return $cookieStore.put(key, val);
                }
              },
              retrieveData: function(key) {
                switch (this.getConfig().storage) {
                  case 'localStorage':
                    return JSON.parse($window.localStorage.getItem(key));
                  default:
                    return $cookieStore.get(key);
                }
              },
              deleteData: function(key) {
                switch (this.getConfig().storage) {
                  case 'localStorage':
                    return $window.localStorage.removeItem(key);
                  default:
                    return $cookieStore.remove(key);
                }
              },
              setAuthHeaders: function(h) {
                var newHeaders;
                newHeaders = angular.extend(this.retrieveData('auth_headers') || {}, h);
                return this.persistData('auth_headers', newHeaders);
              },
              useExternalWindow: function() {
                return !(this.getConfig().forceHardRedirect || $window.isIE());
              },
              initDfd: function() {
                return this.dfd = $q.defer();
              },
              rejectDfd: function(reason) {
                this.invalidateTokens();
                if (this.dfd != null) {
                  this.dfd.reject(reason);
                  return $timeout(((function(_this) {
                    return function() {
                      return _this.dfd = null;
                    };
                  })(this)), 0);
                }
              },
              apiUrl: function(configName) {
                if (this.getConfig(configName).proxyIf()) {
                  return this.getConfig(configName).proxyUrl;
                } else {
                  return this.getConfig(configName).apiUrl;
                }
              },
              getConfig: function(name) {
                return configs[this.getCurrentConfigName(name)];
              },
              getResultOrValue: function(arg) {
                if (typeof arg === 'function') {
                  return arg();
                } else {
                  return arg;
                }
              },
              getCurrentConfigName: function(name) {
                return name || this.getSavedConfig();
              },
              getSavedConfig: function() {
                var c, key;
                c = void 0;
                key = 'currentConfigName';
                if ($window.localStorage) {
                  if (c == null) {
                    c = JSON.parse($window.localStorage.getItem(key));
                  }
                }
                if (c == null) {
                  c = $cookieStore.get(key);
                }
                return c != null ? c : c = defaultConfigName;
              }
            };
          };
        })(this)
      ]
    };
  }).config([
    '$httpProvider', function($httpProvider) {
      var httpMethods;
      $httpProvider.interceptors.push([
        '$injector', function($injector) {
          return {
            request: function(req) {
              $injector.invoke([
                '$http', '$auth', function($http, $auth) {
                  var key, ref, val;
                  if (req.url.match($auth.apiUrl())) {
                    ref = $auth.retrieveData('auth_headers');
                    req.headers["sequence"] = $auth.nextSequence();
                    for (key in ref) {
                      val = ref[key];
                      req.headers[key] = val;
                    }
                  }
                }
              ]);
              return req;
            },
            response: function(resp) {
              $injector.invoke([
                '$http', '$auth', function($http, $auth) {
                  var key, newHeaders, ref, val, seq;
                  if (resp.config.url.match($auth.apiUrl())) {
                    seq = resp.headers("sequence");
                    if(seq && !$auth.checkSequence(seq)){ return; }

                    newHeaders = {};
                    ref = $auth.getConfig().tokenFormat;
                    for (key in ref) {
                      val = ref[key];
                      if (resp.headers(key)) {
                        newHeaders[key] = resp.headers(key);
                      }
                    }
                    return $auth.setAuthHeaders(newHeaders);
                  }
                }
              ]);
              return resp;
            }
          };
        }
      ]);
      if (window.isOldIE()) {
        httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
        return angular.forEach(httpMethods, function(method) {
          var base;
          if ((base = $httpProvider.defaults.headers)[method] == null) {
            base[method] = {};
          }
          return $httpProvider.defaults.headers[method]['If-Modified-Since'] = '0';
        });
      }
    }
  ]).run([
    '$auth', '$window', '$rootScope', function($auth, $window, $rootScope) {
      return $auth.initialize();
    }
  ]);

  window.isOldIE = function() {
    var nav, out, version;
    out = false;
    nav = navigator.userAgent.toLowerCase();
    if (nav && nav.indexOf('msie') !== -1) {
      version = parseInt(nav.split('msie')[1]);
      if (version < 10) {
        out = true;
      }
    }
    return out;
  };

  window.isIE = function() {
    var nav;
    nav = navigator.userAgent.toLowerCase();
    return (nav && nav.indexOf('msie') !== -1) || !!navigator.userAgent.match(/Trident.*rv\:11\./);
  };

  window.isEmpty = function(obj) {
    var key, val;
    if (!obj) {
      return true;
    }
    if (obj.length > 0) {
      return false;
    }
    if (obj.length === 0) {
      return true;
    }
    for (key in obj) {
      val = obj[key];
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  };

}).call(this);
