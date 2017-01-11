import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubreddit, fetchMoreSubmissions } from 'actions/subreddits';
import FRONT_PAGE from 'constants/frontPage';

import FrontPage from 'components/FrontPage';

class FrontPageContainer extends Component {
    static propTypes = {
        isLoadingFirstSubmissions: PropTypes.bool.isRequired,
        isLoadingMoreSubmissions: PropTypes.bool.isRequired,
        onFetchMoreSubmissions: PropTypes.func.isRequired,
        onFetchSubreddit: PropTypes.func.isRequired,
        submissions: PropTypes.array,
        subredditOrder: PropTypes.string.isRequired,
    }

    render() {
        return (
            <FrontPage
                isLoadingFirstSubmissions={this.props.isLoadingFirstSubmissions}
                isLoadingMoreSubmissions={this.props.isLoadingMoreSubmissions}
                onFetchMoreSubmissions={this.props.onFetchMoreSubmissions}
                onFetchSubreddit={this.props.onFetchSubreddit}
                submissions={this.props.submissions}
                subredditOrder={this.props.subredditOrder}
            />
        );
    }
}

function mapStateToProps(state, props) {
    const subreddit = state.reddit.subreddits[FRONT_PAGE];
    const commonProps = {
        subredditOrder: props.route.order,
    };

    if (subreddit === undefined) {
        return {
            ...commonProps,
            isLoadingFirstSubmissions: true,
            isLoadingMoreSubmissions: false,
            submissions: null,
        };
    }

    const subredditSubmissions = subreddit.submissions[props.route.order];

    const submissions = subredditSubmissions.submissionIds === null
        ? null
        : subredditSubmissions.submissionIds.map(id => state.reddit.submissions[id]);

    return {
        ...commonProps,
        submissions,
        isLoadingFirstSubmissions: subredditSubmissions.isLoadingFirst,
        isLoadingMoreSubmissions: subredditSubmissions.isLoadingMore,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchSubreddit: fetchSubreddit,
        onFetchMoreSubmissions: fetchMoreSubmissions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageContainer);
