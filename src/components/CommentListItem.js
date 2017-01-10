import React, { Component, PropTypes } from 'react';

// It's called a CommentListItem because it will render as a vertical list of
// comments, but of course it renders a tree of comments, not a list of
// comments.
export default class CommentListItem extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        commentsById: PropTypes.object.isRequired,
        hasContinueThisThread: PropTypes.bool.isRequired,
        hasMoreReplies: PropTypes.bool.isRequired,
        indentLevel: PropTypes.number.isRequired,
        isLoadingMoreReplies: PropTypes.bool.isRequired,
        moreRepliesCount: PropTypes.number,
        onFetchMoreComments: PropTypes.func.isRequired,
        replyIds: PropTypes.array,
        submissionId: PropTypes.string.isRequired,
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
                {this.props.hasContinueThisThread ? this.renderContinueThisThread() : null}
            </div>
        );
    }

    renderReplies() {
        return this.props.replyIds.map((commentId) => {
            const comment = this.props.commentsById[commentId];

            return (
                <CommentListItem
                    comment={comment.comment}
                    commentsById={this.props.commentsById}
                    hasContinueThisThread={comment.hasContinueThisThread}
                    hasMoreReplies={comment.hasMoreReplies}
                    indentLevel={this.props.indentLevel + 1}
                    isLoadingMoreReplies={comment.isLoadingMoreReplies}
                    key={commentId}
                    moreRepliesCount={comment.moreRepliesCount}
                    onFetchMoreComments={this.props.onFetchMoreComments}
                    replyIds={comment.replyIds}
                    submissionId={this.props.submissionId}
                />
            );
        });
    }

    renderMoreReplies() {
        const style = {
            marginLeft: `${10 * (this.props.indentLevel + 1)}px`,
        };

        return (
            <button style={style} onClick={() => this.fetchMoreReplies()}>
                Load more replies ({this.props.moreRepliesCount})

                {this.props.isLoadingMoreReplies ? 'loading ...' : 'not loading'}
            </button>
        );
    }

    renderContinueThisThread() {
        const style = {
            marginLeft: `${10 * (this.props.indentLevel + 1)}px`,
        };

        return (
            <div style={style}>
                Continue this thread
            </div>
        );
    }
}
