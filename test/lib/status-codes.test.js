'use strict';

const expect = require('chai').expect;
const STATUS_CODES = require('../lib/status-codes');
const http = require('http');

describe('STATUS_CODES', function() {

  for (let code in http.STATUS_CODES) {
    let phrase = http.STATUS_CODES[code];
    it(`${code} => ${phrase}`, function() {
      expect(STATUS_CODES).to.have.property(code, phrase);
    });
  }

});

