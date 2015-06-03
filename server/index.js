require('node-jsx').install({extension:'.jsx'});

import express from 'express';
import httpProxy from 'http-proxy';
import errorHandler from 'errorhandler';
import url from 'url';
import React from 'react';
import { renderToStringAsync } from 'react-async';
import App from '../app/components/app.jsx';

const app = express();
const proxy = httpProxy.createProxyServer();
let server;

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.get('/assets*', function (req, res) {
    proxy.web(req, res, { target: 'http://localhost:3001' });
});

app.get('*',function(req,res){
    var path = url.parse(req.url).pathname;
    let appFactory = React.createFactory(App);

    renderToStringAsync(appFactory({path:path}),function(err, markup) {
        if (err) {
            console.error(err);
        } else {
            res.send('<!DOCTYPE html>' + markup);
        }
    });
});

const startServer = () => {
    if (!server) {
        server = app.listen(8080);
    }
    return server;
};

process.on('exit', () =>
    server.kill('SIGTERM')
);

export default startServer;
