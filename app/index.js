import 'babel/polyfill';
import App from './components/app';
import React from 'react';
import Router from 'react-router';

if (module.hot) {
    module.hot.accept();
}

window.onload = function() {
    const app = React.createElement(App, {css: cssLinks});
    React.render(app, document);
};