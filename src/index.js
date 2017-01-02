import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from 'configureStore';

import App from 'containers/App';
import SubredditContainer from 'containers/SubredditContainer';
import SubmissionContainer from 'containers/SubmissionContainer';
import UserAuthenticator from 'containers/UserAuthenticator';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('root');

const toRender = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="authenticate" component={UserAuthenticator} />

                <Route path="r/:subreddit" component={SubredditContainer} order="hot" />
                <Route path="r/:subreddit/new" component={SubredditContainer} order="new" />
                <Route path="r/:subreddit/rising" component={SubredditContainer} order="rising" />
                <Route path="r/:subreddit/top" component={SubredditContainer} order="topAll" />
                <Route path="r/:subreddit/top/month" component={SubredditContainer} order="topMonth" />
                <Route path="r/:subreddit/top/week" component={SubredditContainer} order="topWeek" />
                <Route path="r/:subreddit/top/day" component={SubredditContainer} order="topDay" />
                <Route path="r/:subreddit/top/hour" component={SubredditContainer} order="topHour" />
                <Route path="r/:subreddit/controversial" component={SubredditContainer} order="controversialAll" />
                <Route path="r/:subreddit/controversial/month" component={SubredditContainer} order="controversialMonth" />
                <Route path="r/:subreddit/controversial/week" component={SubredditContainer} order="controversialWeek" />
                <Route path="r/:subreddit/controversial/day" component={SubredditContainer} order="controversialDay" />
                <Route path="r/:subreddit/controversial/hour" component={SubredditContainer} order="controversialHour" />

                <Route path="r/:subreddit/comments/:submissionId" component={SubmissionContainer} />
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(toRender, rootEl);
