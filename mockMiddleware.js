'use strict';

/**
 * Module dependencies.
 * @private
 */
const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const methods = require('methods');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, relativePath);
const MOCK_DEFAULT_PATH = 'mock';

/**
 * A router-level middleware add mock routes to express server
 *
 * @param {Object} options
 * @returns {Function}
 */
module.exports = function createMockMiddleware(options = {}) {
  options = Object.assign({
    path: MOCK_DEFAULT_PATH,
    fields: {
      code: 'code',
      message: 'message',
      data: 'data',
    },
  }, options);
  let router = undefined;

  function commonCallback(rawData) {
    const { code, message, data } = options.fields;
    let resJson = {};
    if (code) {
      resJson[typeof code === 'string' ? code : 'code'] = 0;
    }
    if (message) {
      resJson[typeof message === 'string' ? message : 'message'] = "success";
    }
    if (data && typeof data === 'string') {
      resJson[data] = rawData;
    } else {
      resJson.data = rawData;
    }
    return (req, res) => res.json(resJson)
  }

  function attachRouter(mockPath) {
    // create a new router once mock files change
    router = express.Router();
    let mockConfigFiles = [];

    if (fs.lstatSync(mockPath).isFile()) {
      mockConfigFiles = [mockPath];
    }
    else {
      mockConfigFiles = fs
        .readdirSync(mockPath)
        // set full path
        .map(file => path.join(mockPath, file))
        // omit dirs from file list
        .filter(file => fs.lstatSync(file).isFile());
    }

    mockConfigFiles
      .map(file => {
        try {
          const mockConfig = require(file);
          delete require.cache[require.resolve(file)];
          return mockConfig;
        } catch (e) {
          return null;
        }
      })
      .filter(v => !!v)
      .reduce((preMocks, mockConfig) => preMocks.concat(Object.keys(mockConfig).map(
        api => ({
          method: api.split(' ')[0],
          uri: api.split(' ')[1],
          fn: typeof mockConfig[api] === 'function' ? mockConfig[api] : commonCallback(mockConfig[api])
        })
      )), [])
      .forEach(mock => {
        const method = mock.method.toLowerCase();
        if (methods.indexOf(method) === -1) {
          return console.log(`Method: ${method} of ${mock.uri} is not supported!
          Please make sure you have defined the right api patten: "[GET|POST|PUT|DELETE] /xxx/xxx"`);
        }
        router[mock.method.toLowerCase()](mock.uri, mock.fn)
      });
  }

  const mockPath = resolveApp(options.path);
  const mockPathExists = fs.existsSync(mockPath);
  if (!mockPathExists && options.path === MOCK_DEFAULT_PATH) {
    const templatePath = resolveOwn('template/mock');
    if (fs.existsSync(templatePath)) {
      fs.copySync(templatePath, mockPath);
    }
  }

  try {
    fs.watch(mockPath, (eventType, filename) => {
      attachRouter(mockPath);
    });
    attachRouter(mockPath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.error(`Mock path: ${mockPath} does not exist! Please check it then restart server.`);
    }
  }

  return function mockMiddleware(req, res, next) {
    if (router) {
      router(req, res, next);
    } else {
      next();
    }
  }
}
