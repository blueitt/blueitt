import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import rootReducer from 'reducers';

const loggerMiddleware = createLogger({ collapsed: true });

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware,
            ),
            persistState(),
        )
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            // eslint-disable-next-line global-require
            const nextRootReducer = require('./reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
