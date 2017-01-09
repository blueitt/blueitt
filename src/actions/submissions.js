import * as api from 'api';

import {
    receiveMoreComments,
    requestMoreCommentReplies,
    appendCommentReplies,
    updateCommentMoreReplies,
} from 'actions/comments';

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

export const APPEND_SUBMISSION_COMMENTS = 'APPEND_SUBMISSION_COMMENTS';
function appendSubmissionComments(submissionId, commentIds) {
    return {
        type: APPEND_SUBMISSION_COMMENTS,
        submissionId,
        commentIds,
    };
}

export const UPDATE_SUBMISSION_MORE_COMMENTS = 'UPDATE_SUBMISSION_MORE_COMMENTS';
function updateSubmissionMoreComments(submissionId,
        hasMoreComments, moreCommentsCount, moreCommentsIds) {
    return {
        type: UPDATE_SUBMISSION_MORE_COMMENTS,
        submissionId,
        hasMoreComments,
        moreCommentsCount,
        moreCommentsIds,
    };
}

export function fetchMoreSubmissionComments(submissionId, fetchRootComments, parentCommentId) {
    return (dispatch, getState) => {
        if (fetchRootComments) {
            dispatch(requestMoreSubmissionComments(submissionId));
        } else {
            dispatch(requestMoreCommentReplies(parentCommentId));
        }

        const state = getState();
        const token = state.auth.accessToken;
        const commentsToExpand = fetchRootComments
            ? state.reddit.submissions[submissionId].moreCommentsIds
            : state.reddit.comments[parentCommentId].moreRepliesIds;

        api.getMoreComments(token, submissionId, fetchRootComments, parentCommentId, commentsToExpand)
            .then(result => {
                dispatch(receiveMoreComments(result.comments));

                if (fetchRootComments) {
                    dispatch(appendSubmissionComments(submissionId, result.rootCommentIds));
                    dispatch(updateSubmissionMoreComments(
                        submissionId,
                        result.rootHasMoreComments,
                        result.rootMoreCommentsCount,
                        result.rootMoreCommentsIds,
                    ));
                } else {
                    dispatch(appendCommentReplies(parentCommentId, result.rootCommentIds));
                    dispatch(updateCommentMoreReplies(
                        parentCommentId,
                        result.rootHasContinueThisThread,
                        result.rootHasMoreComments,
                        result.rootMoreCommentsCount,
                        result.rootMoreCommentsIds,
                    ));
                }
            });
    }
}
