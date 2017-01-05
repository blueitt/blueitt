import React, { Component, PropTypes } from 'react';

// It's called a CommentListItem because it will render as a vertical list of
// comments, but of course it renders a tree of comments, not a list of
// comments.
export default class CommentListItem extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        hasMoreReplies: PropTypes.bool.isRequired,
        moreRepliesCount: PropTypes.number,
        isLoadingMoreReplies: PropTypes.bool.isRequired,
        submissionId: PropTypes.string.isRequired,
        indentLevel: PropTypes.number.isRequired,
        commentsById: PropTypes.object.isRequired,
        onFetchMoreComments: PropTypes.func.isRequired,
    };

    fetchMoreReplies() {
        this.props.onFetchMoreComments(this.props.submissionId, false, this.props.comment.id);
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: `${10 * this.props.indentLevel}px` }}>
                    Comment: {this.props.comment.author}
                </div>

                {this.renderReplies()}
                {this.props.hasMoreReplies ? this.renderMoreReplies() : null}
            </div>
        );
    }

    renderReplies() {
        return this.props.comment.replies.map((commentId, i) => {
            const comment = this.props.commentsById[commentId];

            return <CommentListItem
                key={i}
                comment={comment.comment}
                hasMoreReplies={comment.hasMoreReplies}
                moreRepliesCount={comment.moreRepliesCount}
                isLoadingMoreReplies={comment.isLoadingMoreReplies}
                submissionId={this.props.submissionId}
                indentLevel={this.props.indentLevel + 1}
                commentsById={this.props.commentsById}
                onFetchMoreComments={this.props.onFetchMoreComments}
            />;
        });
    }

    renderMoreReplies() {
        const style = {
            marginLeft: `${10 * (this.props.indentLevel + 1)}px`,
        };

        return (
            <div style={style} onClick={() => this.fetchMoreReplies()}>
                Load more replies ({this.props.moreRepliesCount})

                {this.props.isLoadingMoreReplies ? 'loading ...' : 'not loading'}
            </div>
        );
    }
}
