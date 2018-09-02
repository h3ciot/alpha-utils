# alpha-utils [![Build Status](https://travis-ci.org/yoranfu/alpha-utils.svg?branch=master)](https://travis-ci.org/yoranfu/alpha-utils)

This package includes some utilities used by [alpha-scripts](https://github.com/yoranfu/alpha-scripts)

## Usage
```js
var express = require('express');
var mockMiddleware = require('alpha-utils/mockMiddleware');

var app = express();
...
app.use(mockMiddleware({path: '/mock'}))

```

## Options


### `path` (default: 'mock')

set the path where the mock files in

### `disable` (default: false)

when set to `true`, all mock routes are disabled
