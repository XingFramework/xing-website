(function() {
  module.exports = function(config) {
    return config.set({
      basePath: '../../',
      preprocessors: {
        'src/*.js': ['coverage'],
      },
      files: [
        'test/app/bower_components/angular/angular.js',
        'test/app/bower_components/angular-cookies/angular-cookies.js',
        'test/app/bower_components/angular-mocks/angular-mocks.js',
        'src/*.js',
        'test/test/unit/test-helper.js',
        'test/test/unit/ng-token-auth/**/*.js'
      ],
      autoWatch: true,
      reporters: ['spec', 'coverage'],
      frameworks: ['mocha', 'chai', 'sinon', 'chai-as-promised'],
      browsers: ['Chrome'],
      colors: true,
      client: {
        mocha: {
          ui: 'tdd'
        }
      },
      coverageReporter: {
        type: 'lcov',
        dir: 'coverage/'
      }
    });
  };

}).call(this);
