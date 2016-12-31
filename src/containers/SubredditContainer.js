import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubmissions } from 'actions';

import Subreddit from 'components/Subreddit';

class SubredditContainer extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onFetchSubmissions: PropTypes.func.isRequired,
        submissions: PropTypes.array,
    };

    render() {
        return <Subreddit
            isLoading={this.props.isLoading}
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
            submissions: null,
        };
    } else {
        const submissions = subreddit.submissions[props.route.order];

        return {
            isLoading: subreddit.isLoading,
            submissions: submissions === null ? null : submissions.toJSON(),
        };
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchSubmissions: fetchSubmissions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Subreddit);
