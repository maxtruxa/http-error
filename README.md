# @maxtruxa/http-error

[![npm Version][npm-image]][npm-url]
[![npm Downloads][downloads-image]][downloads-url]
[![Test Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![MIT Licensed][license-image]][license-url]

`HttpError`.

**This README needs some love.**

```js
const HttpError = require('@maxtruxa/http-error');

throw new HttpError(404, {url: 'https://example.com/test'});
```

## Installing

```bash
npm install @maxtruxa/http-error
```

## Features

## Usage

### Direct Usage

```js
const HttpError = require('@maxtruxa/http-error');

// HttpError(code[, message][, properties])
// HttpError(properties)

throw new HttpError(404);
throw new HttpError(404, 'some message');
throw new HttpError(404, {additional: 'information'});
throw new HttpError(404, 'some message', {additional: 'information'});
throw new HttpError({code: 404, additional: 'information'});
```

### Inheriting

## API

## Tests

To run the test suite, install dependencies, then run `npm test`:

```bash
npm install
npm test
```

Coverage reports are generated by running `npm run coverage`.
Linting is done with `npm run lint`.


[npm-image]: https://cdn.maxtruxa.com/shields.io/npm/v/@maxtruxa/http-error.svg
[npm-url]: https://npmjs.org/package/@maxtruxa/http-error
[downloads-image]: https://cdn.maxtruxa.com/shields.io/npm/dm/@maxtruxa/http-error.svg
[downloads-url]: https://npmjs.org/package/@maxtruxa/http-error
[travis-image]: https://cdn.maxtruxa.com/shields.io/travis/maxtruxa/http-error/master.svg
[travis-url]: https://travis-ci.org/maxtruxa/http-error
[coveralls-image]: https://cdn.maxtruxa.com/shields.io/coveralls/github/maxtruxa/http-error/master.svg
[coveralls-url]: https://coveralls.io/github/maxtruxa/http-error?branch=master
[license-image]: https://cdn.maxtruxa.com/shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/maxtruxa/http-error/master/LICENSE

