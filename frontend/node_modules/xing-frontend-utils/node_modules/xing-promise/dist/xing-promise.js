import {AsModule, Factory} from "a1atscript";

class XingPromise {

  static resolve(value) {
    return new XingPromise((res, rej) => res(value));
  }

  static reject(value) {
    return new XingPromise((res, rej) => rej(value));
  };

  constructor(resolver) {
    this.internalPromise = XingPromiseFactory.$q(resolver);
  }

  then(onFulfilled, onRejected, progressBack) {
    return this.internalPromise.then(onFulfilled, onRejected, progressBack);
  }

  catch(callback) {
    return this.internalPromise.catch(callback);
  }

  finally(callback, progressBack) {
    return this.internalPromise.finally(callback, progressBack);
  }
}

export default class XingPromiseFactory {

  @AsModule('XingPromise')
  @Factory('XingPromise', ['$q'])
  static factory($q) {
    XingPromiseFactory.$q = $q;
    return XingPromise;
  }

}
