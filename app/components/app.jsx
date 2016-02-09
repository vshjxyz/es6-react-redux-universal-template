'use strict';

import React from 'react';
import { Link, RouteHandler } from 'react-router';
import { Provider } from 'react-redux';
import Header from '../components/header/main';
import configureStore from '../store';
import CounterActions from '../actions/counter-actions';

if (process.env.BROWSER) {
    require('../styles/app.scss');
}

const store = configureStore();

export default React.createClass({
    displayName: 'App',
    contextTypes: {
        router: React.PropTypes.func
    },
    render() {
        return (
            <section>
                <Header />
                <ul>
                    <li><Link to="/info">Info</Link></li>
                    <li><Link to="/counters">Counters</Link></li>
                </ul>
                <Provider store={store}>
                    { this.props.children }
                </Provider>
            </section>
        );
    }
});
