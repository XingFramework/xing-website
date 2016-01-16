'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a1atscript = require('a1atscript');

var Inflector = (function () {
  function Inflector() {
    _classCallCheck(this, _Inflector);
  }

  var _Inflector = Inflector;

  _createClass(_Inflector, [{
    key: 'camelize',
    value: function camelize(key) {
      if (!angular.isString(key)) {
        return key;
      }

      // should this match more than word and digit characters?
      return key.replace(/_[\w\d]/g, function (match, index, string) {
        return index === 0 ? match : string.charAt(index + 1).toUpperCase();
      });
    }
  }, {
    key: 'humanize',
    value: function humanize(key) {
      if (!angular.isString(key)) {
        return key;
      }

      // should this match more than word and digit characters?
      return key.replace(/_/g, ' ').replace(/(\w+)/g, function (match) {
        return match.charAt(0).toUpperCase() + match.slice(1);
      });
    }
  }, {
    key: 'underscore',
    value: function underscore(key) {
      if (!angular.isString(key)) {
        return key;
      }

      // TODO match the latest logic from Active Support
      return key.replace(/[A-Z]/g, function (match, index) {
        return index === 0 ? match : '_' + match.toLowerCase();
      });
    }
  }, {
    key: 'dasherize',
    value: function dasherize(key) {
      if (!angular.isString(key)) {
        return key;
      }

      // TODO match the latest logic from Active Support
      return key.replace(/[A-Z]/g, function (match, index) {
        return index === 0 ? match : '-' + match.toLowerCase();
      });
    }
  }, {
    key: 'pluralize',
    value: function pluralize(value) {
      // TODO match Active Support
      return value + 's';
    }
  }]);

  Inflector = (0, _a1atscript.Service)('Inflector')(Inflector) || Inflector;
  Inflector = (0, _a1atscript.AsModule)('inflector')(Inflector) || Inflector;
  return Inflector;
})();

exports['default'] = Inflector;
module.exports = exports['default'];