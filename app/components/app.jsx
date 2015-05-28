'use strict';

import React from 'react';
import { RouteHandler, Link } from 'react-router';
import Header from 'components/header/main';

export default React.createClass({
    displayName: 'App',
    render() {
        return (
            <div className="app-wrapper">
                <Header />
                <ul>
                    <li><Link to="counters">Counters</Link></li>
                    <li><Link to="info">Info</Link></li>
                </ul>
                <RouteHandler />
            </div>
        );
    }
});