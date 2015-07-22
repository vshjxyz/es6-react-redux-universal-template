require('node-jsx').install({extension:'.jsx'});

import express from 'express';
import httpProxy from 'http-proxy';
import errorHandler from 'errorhandler';
import url from 'url';
import path from 'path';
import React from 'react';
import { renderToStringAsync } from 'react-async';
import App from '../app/components/app.jsx';

const app = express();
let server;

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.get('/assets*', function (req, res) {
    if (process.env.NODE_ENV == 'development') {
        // When webpack is running
        let proxy = httpProxy.createProxyServer();
        proxy.web(req, res, {target: 'http://localhost:3001'});
    } else {
        res.sendFile(req.path.substr(7), { root: path.join(__dirname + '/../dist') });
    }
});

app.get('*',function(req,res){
    var path = url.parse(req.url).pathname;
    let appFactory = React.createFactory(App);

    let renderPage = (res, css, path) => {
        renderToStringAsync(appFactory({
            css: css,
            path: path
        }),function(err, markup) {
            if (err) {
                console.error(err);
            } else {
                res.send('<!DOCTYPE html>' + markup);
            }
        });
    };

    if (process.env.NODE_ENV != 'development') {
        let glob = require("glob");
        glob(process.cwd() + "/dist/*.css", null, function (er, files) {
            let css = files.map((file) => {
                return file.replace(/^.*[\\\/]/, '');
            });
            renderPage(res, css, path);
        });
    } else {
        renderPage(res, [], path);
    }
});

const startServer = () => {
    if (!server) {
        server = app.listen(8080);
        console.log('port 8080 open');
    }
    return server;
};

process.on('exit', () => {
        if (server) {
            server.kill('SIGTERM');
        }
    }
);

export default startServer;
