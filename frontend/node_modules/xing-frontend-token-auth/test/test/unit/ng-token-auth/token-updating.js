(function() {
  suite('token updating', function() {
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
    suite('header from response should be ', function() {
      setup(function() {
        $httpBackend.expectGET('/api/auth/validate_token').respond(201, successResp, newAuthHeader);
        $cookieStore.put('auth_headers', validAuthHeader);
        dfd = $auth.validateUser();
        return $httpBackend.flush();
      });
      test('discarded if sequence doesn\'t match request', function() {
        $httpBackend.expectGET('/api/test', function(headers) {
          return headers;
        }).respond(201, successResp, {
          'access-token': 'new-access-token',
          'sequence': 123,
          'whatever': 'whatever'
        });
        $http.get('/api/test');
        $httpBackend.flush();
        var newCookies = $cookieStore.get("auth_headers");
        assert.equal(newCookies["access-token"], newAuthHeader['access-token']);
      });
      test('used to update if no sequence included', function() {
        $httpBackend.expectGET('/api/test').respond(function(){
          return [201, successResp, {
            'access-token': 'new-access-token',
            //'sequence': seq,
            'whatever': 'whatever'
          }];
        });
        $http.get('/api/test');
        $httpBackend.flush();
        var newCookies = $cookieStore.get("auth_headers");
        assert.equal(newCookies["access-token"], 'new-access-token');
      });
      test('used to update if sequence matches request', function() {
        var seq;
        $httpBackend.expectGET('/api/test', function(headers) {
          seq = headers["sequence"];
          return headers;
        }).respond(function(){
          return [201, successResp, {
            'access-token': 'new-access-token',
            'sequence': seq,
            'whatever': 'whatever'
          }];
        });
        $http.get('/api/test');
        $httpBackend.flush();
        var newCookies = $cookieStore.get("auth_headers");
        assert.equal(newCookies["access-token"], 'new-access-token');
      });
    });
  });
}).call(this);
