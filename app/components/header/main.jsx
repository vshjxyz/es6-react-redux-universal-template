'use strict';

import React from 'react';

if (process.env.BROWSER) {
    //require('./header.scss');
}

export default React.createClass({
    displayName: 'Header',

    render() {
        return (
            <section className="header">
                <header>
                    <h2>That's just a test.</h2>
                </header>
            </section>
        );
    }
});
