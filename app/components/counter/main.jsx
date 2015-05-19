'use strict';

import React from 'react';
import CounterStore from 'stores/counter-store';
import CounterActions from 'actions/counter-actions';

export default React.createClass({
    displayName: 'Counter',

    propTypes: {
        step: React.PropTypes.number.isRequired
    },

    updateState() {
        return {
            count: CounterStore.getCount()
        }
    },

    getInitialState() {
        return this.updateState();
    },

    componentDidMount() {
        CounterStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        CounterStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState(this.updateState());
    },

    addCount() {
        CounterActions.add(this.props.step);
    },

    render() {
        return (
            <button className="counter" onClick={ this.addCount }>
                {this.state.count}
            </button>
        );
    }
});
