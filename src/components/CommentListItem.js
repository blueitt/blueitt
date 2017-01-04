import React, { Component, PropTypes } from 'react';

// It's called a CommentListItem because it will render as a vertical list of
// comments, but of course it renders a tree of comments, not a list of
// comments.
export default class CommentListItem extends Component {
    static propTypes = {
        commentsById: PropTypes.object.isRequired,
        commentId: PropTypes.string.isRequired,
    };

    render() {
        const comment = this.props.commentsById[this.props.commentId];

        return (
            <div>
                Comment: {comment.author}
            </div>
        );
    }
}
