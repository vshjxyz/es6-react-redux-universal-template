'use strict';

import React from 'react';
import Counter from 'components/counter/main';
import './header.scss';

export default React.createClass({
    displayName: 'Header',

    render() {
        let counters = [];
        for(let i = 0; i < 10; i++) {
            counters.push(<Counter step={i} />);
        }
        return (
            <section className="header">
                <header>
                    <h2>That's just as test.</h2>
                </header>
                {counters}
            </section>
        );
    }
});
