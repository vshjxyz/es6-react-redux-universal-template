'use strict';

import { ActionTypes } from '../core/constants';
import { EventEmitter } from 'events'
import Dispatcher from '../core/dispatcher';
import assign from 'object-assign';

let counter = 0;

let CounterStore = assign({}, EventEmitter.prototype, {
    add(amount) {
        counter += amount;
        return counter;
    },
    subtract(amount) {
        counter -= amount;
        return counter;
    },
    getCount() {
        return counter;
    },
    emitChange() {
        this.emit(ActionTypes.COUNTER_CHANGE);
    },
    addChangeListener(callback) {
        this.on(ActionTypes.COUNTER_CHANGE, callback);
    },
    removeChangeListener(callback) {
        this.removeListener(ActionTypes.COUNTER_CHANGE, callback);
    }
});

Dispatcher.register((action) => {
    console.log('fired');
    switch(action.type) {
        case ActionTypes.COUNTER_ADD:
            CounterStore.add(action.amount);
            CounterStore.emitChange();
            break;
        default:
        // no op
    }
});

export default CounterStore;