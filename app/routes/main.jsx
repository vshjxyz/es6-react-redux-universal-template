'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

export default (
    <Route name='app' path='/' handler={ require('components/app') }>
        <DefaultRoute
            name='counters'
            handler={ require('components/counters') } />
        <Route
            name='info'
            handler={ require('components/info') } />
        <NotFoundRoute handler={ require('pages/not-found') } />
    </Route>
);
