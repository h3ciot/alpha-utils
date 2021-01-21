# alpha-utils [![Build Status](https://travis-ci.com/h3ciot/alpha-utils.svg?branch=master)](https://travis-ci.com/h3ciot/alpha-utils)

This package includes some utilities used by [alpha-scripts](https://github.com/yoranfu/alpha-scripts)


## Installation

```bash
  npm i --save-dev alpha-utils
```

```bash
  yarn add --dev alpha-utils
```

## Usage

Just add the middleware to your `webpack` config as follows:

**webpack.config.js**
```js
const mockMiddleware = require('alpha-utils/mockMiddleware');

module.exports = {
  devServer: {
    before(app) {
      app.use(mockMiddleware({path: './mock'}))
    }
  }
}
```

You can also use the middleware in Express app. For example:

```js
var express = require('express');
var mockMiddleware = require('alpha-utils/mockMiddleware');

var app = express();
...
app.use(mockMiddleware({path: './mock'}))

```

## Options


### `path` (default: 'mock')

set the path where the mock files in

### `disable` (default: false)

when set to `true`, all mock routes are disabled
