'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app.jsx';
import InfoView from './pages/info.jsx';
import DefaultView from './pages/default.jsx';
import CountersView from './pages/counters.jsx';
import NotFoundView from './pages/not-found.jsx';

export default [
    <Route path="/" component={App}>
        <IndexRoute component={DefaultView} />
        <Route path="/info" component={InfoView}></Route>
        <Route path="/counters" component={CountersView}></Route>
        <Route path="*" component={NotFoundView}/>
    </Route>,
];
