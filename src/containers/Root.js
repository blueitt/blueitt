import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from 'containers/App';
import Subreddit from 'containers/Subreddit';
import Post from 'containers/Post';

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
