'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a1atscript = require("a1atscript");

var XingPromise = (function () {
  _createClass(XingPromise, null, [{
    key: 'resolve',
    value: function resolve(value) {
      return new XingPromise(function (res, rej) {
        return res(value);
      });
    }
  }, {
    key: 'reject',
    value: function reject(value) {
      return new XingPromise(function (res, rej) {
        return rej(value);
      });
    }
  }]);

  function XingPromise(resolver) {
    _classCallCheck(this, XingPromise);

    this.internalPromise = XingPromiseFactory.$q(resolver);
  }

  _createClass(XingPromise, [{
    key: 'then',
    value: function then(onFulfilled, onRejected, progressBack) {
      return this.internalPromise.then(onFulfilled, onRejected, progressBack);
    }
  }, {
    key: 'catch',
    value: function _catch(callback) {
      return this.internalPromise['catch'](callback);
    }
  }, {
    key: 'finally',
    value: function _finally(callback, progressBack) {
      return this.internalPromise['finally'](callback, progressBack);
    }
  }]);

  return XingPromise;
})();

var XingPromiseFactory = (function () {
  function XingPromiseFactory() {
    _classCallCheck(this, XingPromiseFactory);
  }

  _createDecoratedClass(XingPromiseFactory, null, [{
    key: 'factory',
    decorators: [(0, _a1atscript.Factory)('XingPromise', ['$q']), (0, _a1atscript.AsModule)('XingPromise')],
    value: function factory($q) {
      XingPromiseFactory.$q = $q;
      return XingPromise;
    }
  }]);

  return XingPromiseFactory;
})();

exports['default'] = XingPromiseFactory;
module.exports = exports['default'];