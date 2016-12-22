import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './configureStore';

import './styles/vendor/foundation.css';

const store = configureStore();

function renderApp() {
    const rootEl = document.getElementById('root');
    const App = require('./containers/App').default;

    const toRender = (
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>
    );

    ReactDOM.render(toRender, rootEl);
}

renderApp();

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        renderApp();
    });
}
