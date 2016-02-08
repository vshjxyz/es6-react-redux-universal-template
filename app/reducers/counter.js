import { ActionTypes } from '../core/constants';

const initialState = 0;

export default function counter(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.COUNTER_ADD:
            return state += action.amount;
        default:
            return state;
    }
};
