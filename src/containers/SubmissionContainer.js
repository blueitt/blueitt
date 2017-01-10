import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubmission, fetchMoreSubmissionComments } from 'actions/submissions';

import Submission from 'components/Submission';

class SubmissionContainer extends Component {
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

    render() {
        return (
            <Submission
                commentIds={this.props.commentIds}
                commentsById={this.props.commentsById}
                hasMoreComments={this.props.hasMoreComments}
                isLoading={this.props.isLoading}
                isLoadingMoreComments={this.props.isLoadingMoreComments}
                moreCommentsCount={this.props.moreCommentsCount}
                onFetchMoreComments={this.props.onFetchMoreComments}
                onFetchSubmission={this.props.onFetchSubmission}
                submission={this.props.submission}
                submissionId={this.props.submissionId}
            />
        );
    }
}

function mapStateToProps(state, props) {
    const submission = state.reddit.submissions[props.params.submissionId];
    const commonProps = {
        commentsById: state.reddit.comments,
        submissionId: props.params.submissionId,
    };

    if (submission === undefined) {
        return {
            ...commonProps,
            hasMoreComments: false,
            isLoading: true,
            isLoadingMoreComments: false,
            moreCommentsCount: null,
            submission: null,
        };
    }

    return {
        ...commonProps,
        commentIds: submission.commentIds,
        hasMoreComments: submission.hasMoreComments,
        isLoading: submission.isLoading,
        isLoadingMoreComments: submission.isLoadingMoreComments,
        moreCommentsCount: submission.moreCommentsCount,
        submission: submission.submission,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchSubmission: fetchSubmission,
        onFetchMoreComments: fetchMoreSubmissionComments,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);
