import 'babel/polyfill';
import App from './components/app';
import React from 'react';
import Router from 'react-router';

if (module.hot) {
    module.hot.accept();
}

if (process.env.BROWSER) {
    window.onload = function() {
        const app = React.createElement(App, {});
        React.render(app, document);
    }
}