import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './App';
import Subreddit from './Subreddit';
import Post from './Post';

export default class Root extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history}>
                    <Route path="/" component={App}>
                        <Route path="r/:subreddit" component={Subreddit} />
                        <Route path="r/:subreddit/comments/:postId" component={Post} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}
