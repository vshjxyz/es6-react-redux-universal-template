import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';

const app = express();
const proxy = httpProxy.createProxyServer();
let server;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get('/assets*', function (req, res) {
    proxy.web(req, res, { target: 'http://localhost:3001' });
});

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

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
