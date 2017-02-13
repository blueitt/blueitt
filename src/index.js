import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from 'components/Root';

import configureStore from 'configureStore';

import 'styles/index.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const toRender = <Root store={store} history={history} />;
const rootEl = document.getElementById('root');
ReactDOM.render(toRender, rootEl);
