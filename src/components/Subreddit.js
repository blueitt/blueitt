import React, { Component, PropTypes } from 'react';

export default class Subreddit extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onFetchPosts: PropTypes.func.isRequired,
        posts: PropTypes.array,
    }

    componentWillMount() {
        this.props.onFetchPosts(this.props.params.subreddit);
    }

    render() {
        return (
            <span>
                <h2>/r/something</h2>
                <div>
                    {this.props.isLoading ? 'loading...' : 'not loading.'}
                </div>

                {this.props.posts === null ? null : this.renderPosts()}
            </span>
        );
    }

    renderPosts() {
        return (
            <ol>
                {this.props.posts.map(post => <li>{post.title}</li>)}
            </ol>
        );
    }
}
