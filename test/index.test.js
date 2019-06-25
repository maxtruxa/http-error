'use strict';

const expect = require('chai').expect;
const HttpError = require('..');
const UserError = require('@maxtruxa/user-error');

function inherits(target, source) {
  target.prototype = Object.create(source.prototype, {
    constructor: {value: target, configurable: true, writable: true}
  });
}

describe('HttpError', function() {

  it('is exported', function() {
    expect(HttpError).to.be.a('function');
  });

  describe('#constructor', function() {

    it('is an instance of HttpError', function() {
      let err = new HttpError();
      expect(err).to.be.an.instanceof(HttpError);
    });

    it('is an instance of UserError', function() {
      let err = new HttpError();
      expect(err).to.be.an.instanceof(UserError);
    });

    it('is an instance of Error', function() {
      let err = new HttpError();
      expect(err).to.be.an.instanceof(Error);
    });

    // name

    it('sets the name from the contructor\'s prototype', function() {
      function CustomError() {
        HttpError.call(this);
      }
      inherits(CustomError, HttpError);
      CustomError.prototype.name = 'FooError';

      let err = new CustomError();
      expect(err).to.have.own.property('name', 'FooError');
    });

    it('sets the name from the contructor', function() {
      function CustomError() {
        HttpError.call(this);
      }
      inherits(CustomError, HttpError);

      let err = new CustomError();
      expect(err).to.have.own.property('name', 'CustomError');
    });

    it('sets the name from properties', function() {
      let err = new HttpError(undefined, {name: 'FooError'});
      expect(err).to.have.own.property('name', 'FooError');
    });

    // code

    it('sets the code to 500 if none is given', function() {
      let err = new HttpError();
      expect(err).to.have.own.property('code', 500);
      expect(err).to.have.own.property('phrase', 'Internal Server Error');
      expect(err).to.have.own.property('message', 'Internal Server Error');
    });

    it('sets the code to whatever is specified', function() {
      // ... and sets related properties correctly.
      let err = new HttpError(404);
      expect(err).to.have.own.property('code', 404);
      expect(err).to.have.own.property('phrase', 'Not Found');
      expect(err).to.have.own.property('message', 'Not Found');
    });

    it('sets the message to the string specified', function() {
      let err = new HttpError(404, 'test');
      expect(err).to.have.own.property('code', 404);
      expect(err).to.have.own.property('phrase', 'Not Found');
      expect(err).to.have.own.property('message', 'test');
    });

    it('sets the code from properties', function() {
      let err = new HttpError(undefined, undefined, {code: 404});
      expect(err).to.have.own.property('code', 404);
      expect(err).to.have.own.property('phrase', 'Not Found');
      expect(err).to.have.own.property('message', 'Not Found');
    });

    it('throws if the status code is not a number', function() {
      expect(() => {
        new HttpError('foo');
      }).to.throw(Error, '"code" must be a number');
    });

    // properties

    it('sets additional properties', function() {
      let err = new HttpError(undefined, undefined, {foo: 'bar', baz: 42});
      expect(err).to.have.own.property('foo', 'bar');
      expect(err).to.have.own.property('baz', 42);
    });

    it('accepts properties as first argument', function() {
      let err = new HttpError({foo: 'bar'});
      expect(err).to.have.own.property('code', 500);
      expect(err).to.have.own.property('message', 'Internal Server Error');
      expect(err).to.have.own.property('message', 'Internal Server Error');
      expect(err).to.have.own.property('foo', 'bar');
    });

    it('accepts properties as second argument', function() {
      let err = new HttpError(undefined, {foo: 'bar'});
      expect(err).to.have.own.property('code', 500);
      expect(err).to.have.own.property('message', 'Internal Server Error');
      expect(err).to.have.own.property('message', 'Internal Server Error');
      expect(err).to.have.own.property('foo', 'bar');
    });

    // phrase

    it('sets phrase according to code', function() {
      let err = new HttpError(404);
      expect(err).to.have.own.property('phrase', 'Not Found');
    });

    it('sets phrase from properties', function() {
      let err = new HttpError(404, {phrase: 'Test'});
      expect(err).to.have.own.property('phrase', 'Test');
    });

    it('sets phrase to Unknown for unknown code', function() {
      let err = new HttpError(199);
      expect(err).to.have.own.property('phrase', 'Unknown');
    });

    // stack

    it('sets the stack', function() {
      let err = new HttpError(500, 'foo');
      expect(err).to.have.own.property('stack');
      let stack = err.stack.split(/\n\s*/);
      expect(stack[0]).to.equal('HttpError: foo');
      expect(stack[1]).to.contain('test/index.test.js');
    });

    it('sets the stack from properties', function() {
      let stack = {};
      let err = new HttpError(500, {stack});
      expect(err).to.have.own.property('stack', stack);
    });

  });

  describe('#toString', function() {

    it('returns a string', function() {
      let err = new HttpError();
      expect(err.toString()).to.be.a('string');
    });

    it('returns a correctly formatted string', function() {
      let err = new HttpError(500, {name: 'CustomError'});
      expect(err.toString()).to.equal('CustomError: Internal Server Error');
    });

    it('returns a correctly formatted string with a message', function() {
      let err = new HttpError(500, 'test');
      expect(err.toString()).to.equal('HttpError: test');
    });

  });

  describe('JSON.stringify', function() {

    it('serializes name and message', function() {
      let err = new HttpError(500, 'test');
      let str = JSON.stringify(err);
      let obj = JSON.parse(str);
      expect(obj).to.have.own.property('name', 'HttpError');
      expect(obj).to.have.own.property('message', 'test');
    });

    it('serializes additional properties', function() {
      let err = new HttpError(500, {foo: 'bar', baz: 'qux'});
      let str = JSON.stringify(err);
      let obj = JSON.parse(str);
      expect(obj).to.have.own.property('foo', 'bar');
      expect(obj).to.have.own.property('baz', 'qux');
    });

  });

});

