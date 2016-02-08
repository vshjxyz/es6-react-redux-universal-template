'use strict';

import React from 'react';
import { Route, NotFoundRoute } from 'react-router';
import App from './components/app.jsx';
import InfoView from './pages/info.jsx';
import CountersView from './pages/counters.jsx';
import NotFoundView from './pages/not-found.jsx';

export default [
    <Route name="root" path="/" handler={App}>
        <Route name="info" path="/info" handler={InfoView}></Route>
        <Route name="counters" path="/counters" handler={CountersView}></Route>
    </Route>,
    <NotFoundRoute name="not-found" handler={NotFoundView}/>
];
