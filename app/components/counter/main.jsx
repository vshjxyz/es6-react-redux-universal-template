import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CounterActions from '../../actions/counter-actions';

const Counter = React.createClass({
    displayName: 'Counter',

    propTypes: {
        step: React.PropTypes.number.isRequired
    },

    addCount() {
        this.props.add(this.props.step);
    },

    render() {
        return (
            <button className="counter" onClick={ this.addCount }>
                {this.props.count}
            </button>
        );
    }
});

export default connect(
    (state) => {
        return {
            count: state.counter
        };
    },
    (dispatch) => bindActionCreators(CounterActions, dispatch)
)(Counter);

