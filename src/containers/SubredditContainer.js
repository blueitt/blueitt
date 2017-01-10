import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubreddit, fetchMoreSubmissions } from 'actions/subreddits';

import Subreddit from 'components/Subreddit';

class SubredditContainer extends Component {
    static propTypes = {
        subredditName: PropTypes.string.isRequired,
        subredditOrder: PropTypes.string.isRequired,
        isLoadingFirst: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        onFetchSubreddit: PropTypes.func.isRequired,
        onFetchMoreSubmissions: PropTypes.func.isRequired,
        submissionIds: PropTypes.array,
        submissionsById: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Subreddit
                subredditName={this.props.subredditName}
                subredditOrder={this.props.subredditOrder}
                isLoadingFirst={this.props.isLoadingFirst}
                isLoadingMore={this.props.isLoadingMore}
                onFetchSubreddit={this.props.onFetchSubreddit}
                onFetchMoreSubmissions={this.props.onFetchMoreSubmissions}
                submissionIds={this.props.submissionIds}
                submissionsById={this.props.submissionsById}
            />
        );
    }
}

function mapStateToProps(state, props) {
    const subreddit = state.reddit.subreddits[props.params.subreddit];
    const commonProps = {
        subredditName: props.params.subreddit,
        subredditOrder: props.route.order,
        submissionsById: state.reddit.submissions,
    };

    if (subreddit === undefined) {
        return {
            ...commonProps,
            isLoadingFirst: true,
            isLoadingMore: false,
            submissionIds: null,
        };
    }

    const subredditSubmissions = subreddit.submissions[props.route.order];

    return {
        ...commonProps,
        isLoadingFirst: subredditSubmissions.isLoadingFirst,
        isLoadingMore: subredditSubmissions.isLoadingMore,
        submissionIds: subredditSubmissions.submissionIds,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchSubreddit: fetchSubreddit,
        onFetchMoreSubmissions: fetchMoreSubmissions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditContainer);
