# alpha-utils

This package includes some utilities used by [alpha-scripts](https://github.com/yoranfu/alpha-scripts)

## Usage
```js
var express = require('express');
var mockMiddleware = require('alpha-utils/mockMiddleware');

var app = express();
...
app.use(mockMiddleware(options: {path: '/mock'}))

```
