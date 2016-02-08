'use strict';

// Delete the `BROWSER` env variable if it's present
// https://github.com/iam4x/isomorphic-flux-boilerplate/issues/16
delete process.env.BROWSER;

// Install `babel` hook for ES6
require('babel-register');

// Start the server
var server = require('./server.js');
server();