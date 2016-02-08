import App from './components/app';
import React from 'react';
import routes from './routes';
import Router from 'react-router';

if (module.hot) {
    module.hot.accept();
}

window.onload = function() {
    Router.run(routes, Router.HistoryLocation, function(Handler) {
        React.render(<Handler />, document);
    });
}