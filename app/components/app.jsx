'use strict';

import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Header from '../components/header/main';

if (process.env.BROWSER) {
    require('../styles/app.scss');
}

export default React.createClass({
    displayName: 'App',
    contextTypes: {
        router: React.PropTypes.func
    },
    render() {
        let cssLinks = [];
        let jsLinks = [];
        if (this.props.styles) {
            cssLinks = this.props.styles.map((href, k) => {
                return <link key={k} rel="stylesheet" type="text/css" href={'/assets/' + href} />
            });
        }
        if (this.props.scripts) {
            jsLinks = this.props.scripts.map((src, k) => {
                return <script key={k} src={'/assets/' + src} />
            });
        }

        return (
            <html>
                <head lang="en">
                    <meta charSet="UTF-8" />
                    <title>Blabla</title>
                    <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans:100,300,400' rel='stylesheet' type='text/css' />
                    { cssLinks }
                </head>
                <body>
                    <div id="app-wrapper">
                        <Header />
                        <ul>
                            <li><Link to="/info">Info</Link></li>
                            <li><Link to="/counters">Counters</Link></li>
                        </ul>
                        <RouteHandler />
                    </div>
                    { jsLinks }
                </body>
            </html>
        );
    }
});