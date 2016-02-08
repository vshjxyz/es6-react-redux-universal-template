'use strict';

import { ActionTypes } from '../core/constants';

export default {
    add(amount) {
       return {
           type: ActionTypes.COUNTER_ADD,
           amount: amount
       };
    }
};