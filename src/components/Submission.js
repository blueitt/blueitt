import React, { Component, PropTypes } from 'react';

import CommentListItem from 'components/CommentListItem';

export default class Submission extends Component {
    static propTypes = {
        commentIds: PropTypes.array,
        commentsById: PropTypes.object.isRequired,
        hasMoreComments: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadingMoreComments: PropTypes.bool.isRequired,
        moreCommentsCount: PropTypes.number,
        onFetchMoreComments: PropTypes.func.isRequired,
        onFetchSubmission: PropTypes.func.isRequired,
        submission: PropTypes.object,
        submissionId: PropTypes.string.isRequired,
    };

    componentWillMount() {
        this.props.onFetchSubmission(this.props.submissionId);
    }

    fetchMoreComments() {
        this.props.onFetchMoreComments(this.props.submissionId, true, null);
    }

    render() {
        return (
            <div>
                {this.props.isLoading ? 'loading submission...' : this.props.submission.title}

                {this.props.commentIds ? this.renderComments() : null}
                {this.props.hasMoreComments ? this.renderMoreComments() : null}
            </div>
        );
    }

    renderComments() {
        const comments = this.props.commentIds.map((commentId) => {
            const comment = this.props.commentsById[commentId];

            return (
                <CommentListItem
                    comment={comment.comment}
                    commentsById={this.props.commentsById}
                    hasContinueThisThread={comment.hasContinueThisThread}
                    hasMoreReplies={comment.hasMoreReplies}
                    indentLevel={0}
                    isLoadingMoreReplies={comment.isLoadingMoreReplies}
                    key={commentId}
                    moreRepliesCount={comment.moreRepliesCount}
                    onFetchMoreComments={this.props.onFetchMoreComments}
                    replyIds={comment.replyIds}
                    submissionId={this.props.submissionId}
                />
            );
        });

        return <div>{comments}</div>;
    }

    renderMoreComments() {
        if (this.props.isLoadingMoreComments) {
            return (
                <div>
                    loading more comments...
                </div>
            );
        }

        return (
            <button onClick={() => this.fetchMoreComments()}>
                load more comments ({this.props.moreCommentsCount})
            </button>
        );
    }
}
