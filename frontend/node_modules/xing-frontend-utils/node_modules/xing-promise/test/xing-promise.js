import XingPromiseFactory from "../src/xing-promise.js";

describe("Xing Promise", function() {
  var xingPromise, XingPromise, promiseImplementation, finalResults;
  beforeEach(function() {
    promiseImplementation = function(...params) {
      return new Promise(...params);
    };

    XingPromise = XingPromiseFactory.factory(promiseImplementation);
  });

  describe("constructor style", function() {
    describe("resolve", function() {
      beforeEach(function(done) {
        xingPromise = new XingPromise((res, rej) => res("Hello"));
        xingPromise.then((results) => {
          finalResults = results;
          done();
        });
      });

      it("should resolve", function() {
        expect(finalResults).toEqual("Hello");
      });
    });

    describe("reject", function() {
      beforeEach(function(done) {
        xingPromise = new XingPromise((res, rej) => rej("Fail"));
        xingPromise.catch((results) => {
          finalResults = results;
          done();
        });
      });

      it("should resolve", function() {
        expect(finalResults).toEqual("Fail");
      });
    });

  });

  describe("resolve", function() {
    beforeEach(function(done) {
      xingPromise = XingPromise.resolve("Hello");
      xingPromise.then((results) => {
        finalResults = results;
        done();
      });
    });

    it("should resolve", function() {
      expect(finalResults).toEqual("Hello");
    });
  });

  describe("reject", function() {
    beforeEach(function(done) {
      xingPromise = XingPromise.reject("Fail");
      xingPromise.catch((results) => {
        finalResults = results;
        done();
      });
    });

    it("should resolve", function() {
      expect(finalResults).toEqual("Fail");
    });
  });
});
