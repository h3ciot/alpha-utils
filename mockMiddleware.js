'use strict';
const fs = require('fs-extra');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, relativePath);

/**
 * A router-level middleware add mock routes to express server
 */
module.exports = function createMockMiddleware(express, config) {
  config = {
    path: 'mock',
    ...config,
  };
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

  const mockPath = resolveApp(config.path);
  const mockPathExists = fs.existsSync(mockPath);
  debugger
  if (!mockPathExists) {
    const templatePath = resolveOwn('template/mock');
    if (fs.existsSync(templatePath)) {
      fs.copySync(templatePath, mockPath);
    }
  }

  fs.watch(mockPath, (eventType, filename) => {
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


