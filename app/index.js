import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import Router from 'react-router';
import { createHistory } from 'history';

if (module.hot) {
    module.hot.accept();
}

window.onload = () => {
    ReactDOM.render(<Router history={createHistory()} routes={routes} />, document.getElementById('app-wrapper'));
};
