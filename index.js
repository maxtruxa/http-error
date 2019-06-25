'use strict';

const UserError = require('@maxtruxa/user-error');
const STATUS_CODES = require('./lib/status-codes');
const hasOwn = Object.prototype.hasOwnProperty;

function HttpError(code, message, properties) {
  if (typeof code === 'object' && code !== null) {
    properties = code;
    message = undefined;
    code = undefined;
  } else if (typeof message === 'object' && message !== null) {
    properties = message;
    message = undefined;
  }

  UserError.call(this, message, properties);

  // Take code from:
  // - properties.code
  // - code
  // - 500
  if (hasOwn.call(this, 'code') && typeof this.code === 'number') {
    code = this.code;
  } else if (!code) {
    code = 500;
  }
  if (typeof code !== 'number') {
    throw new TypeError('"code" must be a number'); // or code = 500?
  }
  this.code = code;

  // Take phrase from:
  // - properties.phrase
  // - HttpError.codeToPhrase(code)
  let phrase;
  if (hasOwn.call(this, 'phrase')) {
    phrase = this.phrase;
  } else {
    phrase = HttpError.codeToPhrase(code);
    if (!phrase) {
      phrase = 'Unknown';
    }
  }
  this.phrase = '' + phrase;

  // Take message from:
  // - properties.message
  // - message
  // - phrase
  if (!this.message) {
    this.message = phrase;
  }
}

HttpError.prototype = Object.create(UserError.prototype, {
  constructor: {value: HttpError, configurable: true, writable: true}
});

// Set name explicitly in case code gets minified.
HttpError.prototype.name = 'HttpError';

HttpError.codeToPhrase = function codeToPhrase(code) {
  return STATUS_CODES[code];
};

module.exports = HttpError;

