import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPosts } from 'actions';

import Subreddit from 'components/Subreddit';

class SubredditContainer extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onFetchPosts: PropTypes.func.isRequired,
        posts: PropTypes.array,
    };

    render() {
        return <Subreddit
            isLoading={this.props.isLoading}
            onFetchPosts={this.props.onFetchPosts}
            posts={this.props.posts}
        />;
    }
}

function mapStateToProps(state, props) {
    const subreddit = state.reddit.subreddits[props.params.subreddit];

    if (subreddit === undefined) {
        return {
            isLoading: true,
            posts: null,
        };
    } else {
        const posts = subreddit.posts[props.route.order];

        return {
            isLoading: subreddit.isLoading,
            posts: posts === null ? null : posts.toJSON(),
        };
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchPosts: fetchPosts,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Subreddit);
