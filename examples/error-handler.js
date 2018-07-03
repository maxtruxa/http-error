'use strict';

const HttpError = require('..');

function errorHandler(err, req, res, next) {
  if (!(err instanceof HttpError)) {
    err = new HttpError(500, {cause: err});
  }
  res.statusMessage = err.phrase;
  res
    .status(err.code)
    .json({
      status: err.code,
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? err.name : err
    });
}

module.exports = errorHandler;

