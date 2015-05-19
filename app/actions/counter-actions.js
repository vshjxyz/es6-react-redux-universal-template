'use strict';

import { ActionTypes } from 'core/constants';
import Dispatcher from 'core/dispatcher';

export default {
    add(amount) {
       Dispatcher.dispatch({
           type: ActionTypes.COUNTER_ADD,
           amount: amount
       });
    }
};