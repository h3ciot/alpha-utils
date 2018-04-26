'use strict';

module.exports = {
  'GET /api': function (req, res) {
    res.json({
      "code": 0,
      "mesage": "",
      "data": {
        "title": "mock",
        "author": "yoranfu"
      }
    });
  },
};
