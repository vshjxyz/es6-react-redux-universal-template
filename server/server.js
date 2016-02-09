import express from 'express';
import httpProxy from 'http-proxy';
import errorHandler from 'errorhandler';
import url from 'url';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import Router from 'react-router';
import App from '../app/components/app.jsx';
import routes from '../app/routes';
import { RouteErrors } from  '../app/core/constants';
import globPromise from './globPromise';

const app = express();
let server;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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

let renderRouter = (req) => {
    return new Promise((resolve, reject) => {
        let url = req.url;
        let router = Router.create({
            routes: routes,
            location: url,
            onAbort: (route) => {
                return reject({
                    error: RouteErrors.REDIRECT,
                    route: route
                });
            },

            onError: () => {
                return reject({
                    error: RouteErrors.ROUTING
                });
            }
        });

        router.run((Handler, routerState) => {
            if (routerState.routes[0].name === 'not-found') {
                let prerenderedNotFoundPage = ReactDOMServer.renderToStaticMarkup(React.createFactory(Handler)());
                return reject({
                    error: RouteErrors.NOT_FOUND,
                    html: prerenderedNotFoundPage
                });
            }

            if (process.env.NODE_ENV != 'development') {
                Promise.all([
                    globPromise(process.cwd() + '/dist/*.css'),
                    globPromise(process.cwd() + '/dist/*.js')
                ]).then(([cssList, jsList]) => {
                    const prerenderedPage = ReactDOMServer.renderToString(React.createFactory(Handler)());
                    resolve({
                        html: prerenderedPage,
                        styles: cssList,
                        scripts: jsList
                    });
                }, reject);
            } else {
                const prerenderedPage = ReactDOMServer.renderToString(React.createFactory(Handler)());
                resolve({
                    html: prerenderedPage,
                    styles: [],
                    scripts: [ 'bundle.js' ]
                });
            }
        });
    });
};


app.get('*',function(req,res){
    renderRouter(req)
        .then((renderedRouter) => {
            res.render('index', renderedRouter);
        })
        .catch((renderedRouter) => {
            let error = renderedRouter.error;
            let html = renderedRouter.html;

            switch (error) {
                case RouteErrors.ROUTING:
                    res.status(500);
                    res.send('Routing error');
                    break;
                case RouteErrors.REDIRECT:
                    res.redirect(renderedRouter.route.to);
                    break;
                case RouteErrors.NOT_FOUND:
                    res.status(404);
                    res.send(html);
                    break;
                default:
                    console.error(renderedRouter.stack || renderedRouter.stacktrace || renderedRouter);
                    res.status(500);
                    res.send('Server Error');
                    break;
            }
        });
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
