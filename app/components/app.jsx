'use strict';

import React from 'react';
import { Locations, Location, Link, NotFound } from 'react-router-component';
import Header from '../components/header/main';
import InfoView from '../pages/info';
import CountersView from '../pages/counters';
import NotFoundView from '../pages/not-found';

if (process.env.BROWSER) {
    require('../styles/app.scss');
}

export default React.createClass({
    displayName: 'App',
    render() {
        return (
            <html>
                <head lang="en">
                    <meta charSet="UTF-8" />
                    <title>Blabla</title>
                    <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans:100,300,400' rel='stylesheet' type='text/css' />
                </head>
                <body>
                    <div id="app-wrapper">
                        <Header />
                        <ul>
                            <li><Link href="/info">Info</Link></li>
                            <li><Link href="/counters">Counters</Link></li>
                        </ul>
                        <Locations path={this.props.path}>
                            <Location path="/info" handler={InfoView} />
                            <Location path="/counters" handler={CountersView} />
                            <NotFound handler={NotFoundView} />
                        </Locations>
                    </div>
                    <script src="/assets/bundle.js"></script>
                </body>
            </html>
        );
    }
});