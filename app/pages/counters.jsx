import React from 'react';
import Counter from '../components/counter/main';

export default React.createClass({
    displayName: 'Counters',

    render() {
        let counters = [];
        for(let i = 0; i < 10; i++) {
            counters.push(<Counter key={'Counter-' + i} step={i} />);
        }
        return (
            <div>
                <h1>Counters</h1>
                {counters}
            </div>
        );
    }
});
