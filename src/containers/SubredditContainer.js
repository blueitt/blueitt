import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubmissions, fetchMoreSubmissions } from 'actions';

import Subreddit from 'components/Subreddit';

class SubredditContainer extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        onFetchSubmissions: PropTypes.func.isRequired,
        onFetchMoreSubmissions: PropTypes.func.isRequired,
        submissions: PropTypes.array,
    };

    render() {
        return <Subreddit
            isLoading={this.props.isLoading}
            isLoadingMore={this.props.isLoadingMore}
            onFetchSubmissions={this.props.onFetchSubmissions}
            submissions={this.props.submissions}
        />;
    }
}

function mapStateToProps(state, props) {
    const subreddit = state.reddit.subreddits[props.params.subreddit];

    if (subreddit === undefined) {
        return {
            isLoading: true,
            isLoadingMore: false,
            submissions: null,
        };
    } else {
        const submissionIds = subreddit.submissions[props.route.order];

        return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Subreddit);
