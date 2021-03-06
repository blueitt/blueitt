import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import AppContainer from 'containers/AppContainer';
import FrontPageContainer from 'containers/FrontPageContainer';
import SubmissionContainer from 'containers/SubmissionContainer';
import SubredditContainer from 'containers/SubredditContainer';
import UserAuthenticatorContainer from 'containers/UserAuthenticatorContainer';

export default class Root extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history}>
                    <Route path="" component={AppContainer}>
                        <Route path="/authenticate" component={UserAuthenticatorContainer} />

                        <Route path="/" component={FrontPageContainer} order="hot" />
                        <Route path="/new" component={FrontPageContainer} order="new" />
                        <Route path="/rising" component={FrontPageContainer} order="rising" />
                        <Route path="/top" component={FrontPageContainer} order="topAll" />
                        <Route path="/top/month" component={FrontPageContainer} order="topMonth" />
                        <Route path="/top/week" component={FrontPageContainer} order="topWeek" />
                        <Route path="/top/day" component={FrontPageContainer} order="topDay" />
                        <Route path="/top/hour" component={FrontPageContainer} order="topHour" />
                        <Route path="/controversial" component={FrontPageContainer} order="controversialAll" />
                        <Route path="/controversial/month" component={FrontPageContainer} order="controversialMonth" />
                        <Route path="/controversial/week" component={FrontPageContainer} order="controversialWeek" />
                        <Route path="/controversial/day" component={FrontPageContainer} order="controversialDay" />
                        <Route path="/controversial/hour" component={FrontPageContainer} order="controversialHour" />

                        <Route path="/r/:subreddit" component={SubredditContainer} order="hot" />
                        <Route path="/r/:subreddit/new" component={SubredditContainer} order="new" />
                        <Route path="/r/:subreddit/rising" component={SubredditContainer} order="rising" />
                        <Route path="/r/:subreddit/top" component={SubredditContainer} order="topAll" />
                        <Route path="/r/:subreddit/top/month" component={SubredditContainer} order="topMonth" />
                        <Route path="/r/:subreddit/top/week" component={SubredditContainer} order="topWeek" />
                        <Route path="/r/:subreddit/top/day" component={SubredditContainer} order="topDay" />
                        <Route path="/r/:subreddit/top/hour" component={SubredditContainer} order="topHour" />
                        <Route path="/r/:subreddit/controversial" component={SubredditContainer} order="controversialAll" />
                        <Route path="/r/:subreddit/controversial/month" component={SubredditContainer} order="controversialMonth" />
                        <Route path="/r/:subreddit/controversial/week" component={SubredditContainer} order="controversialWeek" />
                        <Route path="/r/:subreddit/controversial/day" component={SubredditContainer} order="controversialDay" />
                        <Route path="/r/:subreddit/controversial/hour" component={SubredditContainer} order="controversialHour" />

                        <Route path="/r/:subreddit/comments/:submissionId" component={SubmissionContainer} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}
