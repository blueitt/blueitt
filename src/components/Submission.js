import React, { Component, PropTypes } from 'react';

import CommentListItem from 'components/CommentListItem';

export default class Submission extends Component {
    static propTypes = {
        submissionId: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadingMoreComments: PropTypes.bool.isRequired,
        submission: PropTypes.object,
        hasMoreComments: PropTypes.bool.isRequired,
        moreCommentsCount: PropTypes.number,
        commentsById: PropTypes.object.isRequired,
        onFetchSubmission: PropTypes.func.isRequired,
        onFetchMoreComments: PropTypes.func.isRequired,
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
                hi im a submission

                {this.props.submission ? this.renderComments() : null}
                {this.props.hasMoreComments ? this.renderMoreComments() : null}
            </div>
        );
    }

    renderComments() {
        const comments = this.props.submission.comments.map((commentId, i) => {
            const comment = this.props.commentsById[commentId];

            return <CommentListItem
                key={i}
                comment={comment.comment}
                hasMoreReplies={comment.hasMoreReplies}
                moreRepliesCount={comment.moreRepliesCount}
                isLoadingMoreReplies={comment.isLoadingMoreReplies}
                submissionId={this.props.submissionId}
                indentLevel={0}
                commentsById={this.props.commentsById}
                onFetchMoreComments={this.props.onFetchMoreComments}
            />;
        });

        return <div>{comments}</div>
    }

    renderMoreComments() {
        if (this.props.isLoadingMoreComments) {
            return (
                <div>
                    loading more comments...
                </div>
            )
        } else {
            return (
                <div onClick={() => this.fetchMoreComments()}>
                    load more comments ({this.props.moreCommentsCount})
                </div>
            );
        }
    }
}
