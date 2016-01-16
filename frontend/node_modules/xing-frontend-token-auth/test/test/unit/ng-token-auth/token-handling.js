(function() {
  suite('token handling', function() {
    var dfd, errorResp, newAuthHeader, successResp;
    newAuthHeader = {
      'access-token': '(^_^)',
      'token-type': 'Bearer',
      client: validClient,
      expiry: validExpiry.toString(),
      uid: validUid.toString()
    };
    dfd = null;
    successResp = {
      success: true,
      data: validUser
    };
    errorResp = {
      errors: ['unauthorized'],
      message: 'expired headers'
    };
    suite('header from response should be stored in cookies', function() {
      setup(function() {
        $httpBackend.expectGET('/api/auth/validate_token').respond(201, successResp, newAuthHeader);
        $cookieStore.put('auth_headers', validAuthHeader);
        dfd = $auth.validateUser();
        return $httpBackend.flush();
      });
      test('headers should be updated', function() {
        return assert.deepEqual(newAuthHeader, $auth.retrieveData('auth_headers'));
      });
      test('header is included with the next request to the api', function() {
        $httpBackend.expectGET('/api/test', function(headers) {
          assert.equal(newAuthHeader['access-token'], headers['access-token']);
          return headers;
        }).respond(201, successResp, {
          'access-token': 'access-token',
          'whatever': 'whatever'
        });
        $http.get('/api/test');
        return $httpBackend.flush();
      });
      test('header is not included in requests to alternate apis', function() {
        $httpBackend.expectGET('/alternate-api/test', function(headers) {
          assert.equal(null, headers['access-token']);
          return headers;
        }).respond(201, successResp, {
          'access-token': 'access-token',
          'whatever': 'whatever'
        });
        $http.get('/alternate-api/test');
        return $httpBackend.flush();
      });
      test('promise should be resolved', function(done) {
        dfd.then(function() {
          assert(true);
          return done();
        });
        return $timeout.flush();
      });
      return test('subsequent calls to validateUser do not require api requests', function(done) {
        $auth.validateUser().then(function() {
          assert(true);
          return done();
        });
        $timeout.flush();
        return false;
      });
    });
    suite('undefined headers', function() {
      test('validateUser should not make requests if no token is present', function() {
        $auth.validateUser()["catch"](function() {
          return assert(true);
        });
        return $timeout.flush();
      });
      return test('validation request should not be made if headers are empty', function() {
        $cookieStore.put('auth_headers', {});
        $auth.validateUser()["catch"](function() {
          return assert(true);
        });
        return $timeout.flush();
      });
    });
    suite('invalid headers', function() {
      setup(function() {
        $httpBackend.expectGET('/api/auth/validate_token').respond(401, errorResp);
        $cookieStore.put('auth_headers', {
          'access-token': '(-_-)'
        });
        dfd = $auth.validateUser();
        return $httpBackend.flush();
      });
      test('promise should be rejected', function(done) {
        dfd["catch"](function() {
          assert(true);
          return done();
        });
        return $timeout.flush();
      });
      return test('$rootScope broadcasts invalid auth event', function() {
        assert($rootScope.$broadcast.calledWithMatch('auth:validation-error', errorResp));
        return $timeout.flush();
      });
    });
    return suite('expired headers', function() {
      var expiredExpiry, expiredHeaders;
      expiredExpiry = (new Date().getTime() / 1000) - 500 | 0;
      expiredHeaders = {
        "access-token": "(x_x)",
        "token-type": 'Bearer',
        client: validClient,
        expiry: expiredExpiry,
        uid: validUid
      };
      setup(function() {
        return $cookieStore.put('auth_header', expiredHeaders);
      });
      return test('promise should be rejected without making request', function() {
        var caught;
        caught = false;
        $auth.validateUser()["catch"](function() {
          return caught = true;
        });
        $timeout.flush();
        return assert(caught);
      });
    });
  });

}).call(this);
