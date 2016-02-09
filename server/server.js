import express from 'express';
import httpProxy from 'http-proxy';
import errorHandler from 'errorhandler';
import path from 'path';
import consolidate from 'consolidate';
import { RouteErrors } from  '../app/core/constants';
import { routeUrl, renderRouter } from './react-renderer';

const app = express();
let server;

app.engine('hbs', consolidate.handlebars);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

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
    routeUrl(req.url)
        .then(renderRouter)
        .then((renderedRouter) => {
            res.render('index', renderedRouter);
        })
        .catch((renderedRouter) => {
            switch (renderedRouter.error) {
                case RouteErrors.ROUTING:
                    res.status(500);
                    res.render('index', { html: 'Routing error'});
                    break;
                case RouteErrors.REDIRECT:
                    res.redirect(renderedRouter.route.to);
                    break;
                case RouteErrors.NOT_FOUND:
                    res.status(404);
                    renderRouter(renderedRouter.props).then((renderedRouter) => res.render('index', renderedRouter));
                    break;
                default:
                    console.error(renderedRouter.stack || renderedRouter.stacktrace || renderedRouter);
                    res.status(500);
                    res.render('index', { html: 'Routing error'});
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
});

export default startServer;
