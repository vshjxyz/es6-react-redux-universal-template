import 'babel/polyfill';
import 'styles/app.scss';
import 'components/app';
import React from 'react';
import Router from 'react-router';
import routes from 'routes/main';

if (module.hot) {
    module.hot.accept();
}

Router.run(
    routes,
    Router.HistoryLocation,
    (Handler) => {
        const app = React.createElement(Handler, {});
        React.render(app, document.getElementById('app-wrapper'));
    }
);