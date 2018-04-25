'use strict';
const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

/**
 * A router-level middleware add mock routes to express server
 */
module.exports = function createMockMiddleware(express) {
  let router = undefined;
  let counter = 0;// test variable
  function attachRouter() {
    router = express.Router();
    // test begin
    counter += 1;
    router.get(`/mock${counter}`, (req, res) => {
      res.end(`mock${counter}`)
    });
    // test end
  }

  fs.watch(resolveApp('mock.js'), (eventType, filename) => {
    attachRouter();
  });

  return function mockMiddleware(req, res, next) {
    if (router) {
      router(req, res, next);
    } else {
      next();
    }
  }
}
