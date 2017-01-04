import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSubmission, fetchMoreComments } from 'actions';

import Submission from 'components/Submission';

class SubmissionContainer extends Component {
    static propTypes = {
        // isLoading: PropTypes.bool.isRequired,
        // submission: PropTypes.object,
        // hasMoreComments: PropTypes.bool.isRequired,
        // moreCommentsCount: PropTypes.number,
        // commentsById: PropTypes.object.isRequired,
        // onFetchSubmission: PropTypes.func.isRequired,
        // onFetchMoreComments: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.onFetchSubmission(this.props.params.submissionId);
    }

    render() {
        return <h3>foo</h3>;
        // return (
        //     <Submission
        //         isLoading={this.props.isLoading}
        //         submission={this.props.submission}
        //         hasMoreComments={this.props.hasMoreComments}
        //         moreCommentsCount={this.props.moreCommentsCount}
        //         commentsById={this.props.commentsById}
        //         onFetchSubmission={this.props.onFetchSubmission}
        //         onFetchMoreComments={this.props.onFetchMoreComments}
        //     />
        // );
    }
}

function mapStateToProps(state, props) {
    const submission = state.reddit.submissions[props.params.submissionId];

    if (submission === undefined) {
        return {
            isLoading: true,
            submission: null,
            commentsById: state.reddit.comments,
        };
    } else {
        return {
            isLoading: submission.isLoading,
            submission: submission.submission,
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
