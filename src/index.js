import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'vendor/snoowrap';

import configureStore from './configureStore';

import App from './containers/App';
import Post from './containers/Post';
import Subreddit from './containers/Subreddit';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('root');

const toRender = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="r/:subreddit" component={Subreddit} />
                <Route path="r/:subreddit/comments/:postId" component={Post} />
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(toRender, rootEl);

console.log(window.snoowrap);
