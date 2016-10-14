'use strict';

require('babel-register');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var DashboardPlugin = require('webpack-dashboard/plugin');

var config = require('./dev.config');

var compiler = webpack(config.webpack);
compiler.apply(new DashboardPlugin());
var devServer = new WebpackDevServer(compiler, config.server.options);

devServer.listen(config.server.port, 'localhost', function () {
    console.log('server open');
});
