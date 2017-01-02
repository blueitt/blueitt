import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubmissionComments, fetchMoreComments } from 'actions';

import CommentListItem from 'components/CommentListItem';

class SubmissionContainer extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        submission: PropTypes.object,
        onFetchSubmissionComments: PropTypes.func.isRequired,
        onFetchMoreComments: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.onFetchSubmissionComments(this.props.params.submissionId);
    }

    render() {
        return (
            <div>
                <h3>submission</h3>

                {this.props.isLoading ? 'loading ...' : 'not loading.'}

                {this.props.submission ? this.renderComments() : null}
            </div>
        );
    }

    renderComments() {
        return this.props.submission.comments.map((comment, i) => {
            return <CommentListItem
                key={i}
                isLoadMoreComments={comment.isLoadMoreComments}
                comment={comment.comment}
                onFetchMoreComments={this.props.onFetchMoreComments}
                submissionId={this.props.params.submissionId}
                parentIsSubmission={comment.parentIsSubmission}
                parentCommentId={comment.parentCommentId}
                moreCommentsCount={comment.moreCommentsCount}
            />;
        });
    }
}

function listingHasMore(listing) {
    return listing._more !== null && listing._more.count !== undefined;
}

function scalarizeSnoowrapSubmission(submission) {
    const fetchedComments = submission.comments.map(comment => ({
        isLoadMoreComments: false,
        comment: scalarizeSnoowrapComment(comment),
    }));

    if (listingHasMore(submission.comments)) {
        const more = {
            isLoadMoreComments: true,
            parentIsSubmission: true,
            moreCommentsCount: submission.comments._more.count,
        };

        return {
            ...submission.toJSON(),
            comments: [...fetchedComments, more],
        };
    } else {
        return {
            ...submission.toJSON(),
            comments: [...fetchedComments],
        };
    }
}

function scalarizeSnoowrapComment(comment) {
    const fetchedReplies = comment.replies.map(reply => ({
        isLoadMoreComments: false,
        comment: scalarizeSnoowrapComment(reply),
    }));

    if (listingHasMore(comment.replies)) {
        const more = {
            isLoadMoreComments: true,
            parentIsSubmission: false,
            parentCommentId: comment.id,
            moreCommentsCount: comment.replies._more.count,
        };

        return {
            ...comment.toJSON(),
            replies: [...fetchedReplies, more],
        };
    } else {
        return {
            ...comment.toJSON(),
            replies: [...fetchedReplies],
        };
    }
}

function mapStateToProps(state, props) {
    const submission = state.reddit.submissions[props.params.submissionId];

    if (submission === undefined) {
        return {
            isLoading: true,
            submission: null,
        };
    } else {
        const redditSubmission = submission.submission;

        return {
            isLoading: submission.isLoading,
            submission: redditSubmission === null ? null : scalarizeSnoowrapSubmission(redditSubmission),
        };
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchSubmissionComments: fetchSubmissionComments,
        onFetchMoreComments: fetchMoreComments,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);
