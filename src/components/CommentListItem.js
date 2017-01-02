import React, { Component, PropTypes } from 'react';

// It's called a CommentListItem because it will render as a vertical list of
// comments, but of course it renders a tree of comments, not a list of
// comments.
export default class CommentListItem extends Component {
    static propTypes = {
        isLoadMoreComments: PropTypes.bool.isRequired,
        comment: PropTypes.object,

        // these props are required when isLoadMoreComments is `true`
        onFetchMoreComments: PropTypes.func,
        submissionId: PropTypes.string,
        parentIsSubmission: PropTypes.bool,
        parentCommentId: PropTypes.string,
        moreCommentsCount: PropTypes.number,
        isLoadingMore: PropTypes.bool,
    };

    fetchMoreComments() {
        this.props.onFetchMoreComments(
            this.props.submissionId,
            this.props.parentIsSubmission,
            this.props.parentCommentId
        );
    }

    render() {
        if (this.props.isLoadMoreComments) {
            return (
                <div onClick={() => this.fetchMoreComments()}>
                    Load more. ({this.props.moreCommentsCount})

                    {this.props.isLoadingMore ? 'loading ...' : 'not loading'}
                </div>
            )
        } else {
            return (
                <div>
                    Comment: {this.props.comment.author}
                </div>
            )
        }
    }
}
