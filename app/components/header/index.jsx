'use strict';

import React from 'react';
import './header.scss';

export default React.createClass({
    displayName: 'Header',

    render() {
        return (
            <section className="header">
                <header>
                    <h2>That's just as test.</h2>
                </header>
            </section>
        );
    }
});
