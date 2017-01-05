import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubmissions, fetchMoreSubmissions } from 'actions';

import Subreddit from 'components/Subreddit';

class SubredditContainer extends Component {
    static propTypes = {
        subredditName: PropTypes.string.isRequired,
        subredditOrder: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        onFetchSubmissions: PropTypes.func.isRequired,
        onFetchMoreSubmissions: PropTypes.func.isRequired,
        submissions: PropTypes.array,
    };

    render() {
        return <Subreddit
            subredditName={this.props.subredditName}
            subredditOrder={this.props.subredditOrder}
            isLoading={this.props.isLoading}
            isLoadingMore={this.props.isLoadingMore}
            submissions={this.props.submissions}
            onFetchSubmissions={this.props.onFetchSubmissions}
            onFetchMoreSubmissions={this.props.onFetchMoreSubmissions}
        />;
    }
}

function mapStateToProps(state, props) {
    const subreddit = state.reddit.subreddits[props.params.subreddit];
    const propsFromRouter = {
        subredditName: props.params.subreddit,
        subredditOrder: props.route.order,
    };

    if (subreddit === undefined) {
        return {
            ...propsFromRouter,
            isLoading: true,
            isLoadingMore: false,
            submissions: null,
        };
    } else {
        const submissionIds = subreddit.submissions[props.route.order];

        return {
            ...propsFromRouter,
            isLoading: subreddit.isLoading,
            isLoadingMore: subreddit.isLoadingMore,
            submissions: submissionIds === null ? null : submissionIds.map(id => state.reddit.submissions[id]),
        };
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchSubmissions: fetchSubmissions,
        onFetchMoreSubmissions: fetchMoreSubmissions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditContainer);
