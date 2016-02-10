import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const storeEnhancer = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : undefined;
    const store = createStore(rootReducer, initialState, storeEnhancer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store
};
