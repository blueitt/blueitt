import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubmission, fetchMoreComments } from 'actions';

import Submission from 'components/Submission';

class SubmissionContainer extends Component {
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

    render() {
        return <Submission
            submissionId={this.props.submissionId}
            isLoading={this.props.isLoading}
            isLoadingMoreComments={this.props.isLoadingMoreComments}
            submission={this.props.submission}
            hasMoreComments={this.props.hasMoreComments}
            moreCommentsCount={this.props.moreCommentsCount}
            commentsById={this.props.commentsById}
            onFetchSubmission={this.props.onFetchSubmission}
            onFetchMoreComments={this.props.onFetchMoreComments}
        />;
    }
}

function mapStateToProps(state, props) {
    const submission = state.reddit.submissions[props.params.submissionId];
    const propsFromRouter = {
        submissionId: props.params.submissionId,
    };

    if (submission === undefined) {
        return {
            ...propsFromRouter,
            isLoading: true,
            isLoadingMoreComments: false,
            submission: null,
            hasMoreComments: false,
            moreCommentsCount: null,
            commentsById: state.reddit.comments,
        };
    } else {
        return {
            ...propsFromRouter,
            isLoading: submission.isLoading,
            isLoadingMoreComments: submission.isLoadingMoreComments,
            submission: submission.submission,
            hasMoreComments: submission.hasMoreComments,
            moreCommentsCount: submission.moreCommentsCount,
            commentsById: state.reddit.comments,
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFetchSubmission: fetchSubmission,
        onFetchMoreComments: fetchMoreComments,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);
