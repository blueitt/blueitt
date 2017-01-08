import * as api from 'api';

export const REQUEST_SUBMISSION = 'REQUEST_SUBMISSION';
function requestSubmission(submissionId) {
    return {
        type: REQUEST_SUBMISSION,
        submissionId,
    };
}

export const RECEIVE_SUBMISSION = 'RECEIVE_SUBMISSION';
function receiveSubmission(submissionId, submission, comments) {
    return {
        type: RECEIVE_SUBMISSION,
        submissionId,
        submission,
        comments,
    };
}

export const REQUEST_MORE_SUBMISSION_COMMENTS = 'REQUEST_MORE_SUBMISSION_COMMENTS';
function requestMoreSubmissionComments(submissionId) {
    return {
        type: REQUEST_MORE_SUBMISSION_COMMENTS,
        submissionId,
    };
}

export function fetchSubmission(submissionId) {
    return (dispatch, getState) => {
        dispatch(requestSubmission(submissionId));

        const state = getState();
        const token = state.auth.accessToken;

        api.getSubmission(token, submissionId)
            .then(({ submission, comments }) => {
                dispatch(receiveSubmission(submissionId, submission, comments));
            });
    }
}

export function fetchMoreSubmissionComments(submissionId) {
    return (dispatch, getState) => {
        dispatch(requestMoreSubmissionComments(submissionId));
    }
}
