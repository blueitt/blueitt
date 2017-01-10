import {
    RECEIVE_SUBREDDIT_SUBMISSIONS,
    RECEIVE_MORE_SUBREDDIT_SUBMISSIONS,
} from 'actions/subreddits';

import {
    APPEND_SUBMISSION_COMMENTS,
    RECEIVE_SUBMISSION,
    REQUEST_MORE_SUBMISSION_COMMENTS,
    REQUEST_SUBMISSION,
    UPDATE_SUBMISSION_MORE_COMMENTS,
} from 'actions/submissions';

export default function submissions(state = {}, action) {
    switch (action.type) {
    case RECEIVE_SUBREDDIT_SUBMISSIONS:
    case RECEIVE_MORE_SUBREDDIT_SUBMISSIONS:
        const newSubmissions = action.submissions.map(newSubmission => ({
            [newSubmission.id]: {
                ...DEFAULT_SUBMISSION_STATE,
                submission: newSubmission,
            },
        }));

        return Object.assign(
            {},
            state,
            ...newSubmissions,
        );
    case APPEND_SUBMISSION_COMMENTS:
    case RECEIVE_SUBMISSION:
    case REQUEST_MORE_SUBMISSION_COMMENTS:
    case REQUEST_SUBMISSION:
    case UPDATE_SUBMISSION_MORE_COMMENTS:
        return {
            ...state,
            [action.submissionId]: submission(state[action.submissionId], action),
        };
    default:
        return state;
    }
}

const DEFAULT_SUBMISSION_STATE = {
    submission: null,
    isLoading: false,
    isLoadingMoreComments: false,
    commentIds: null,
    hasMoreComments: false,
    moreCommentsCount: null,
    moreCommentsIds: null,
};

function submission(state = DEFAULT_SUBMISSION_STATE, action) {
    switch (action.type) {
    case APPEND_SUBMISSION_COMMENTS:
        return {
            ...state,
            commentIds: [...state.commentIds, ...action.commentIds],
        };
    case REQUEST_SUBMISSION:
        return {
            ...state,
            isLoading: true,
        };
    case RECEIVE_SUBMISSION:
        return {
            ...state,
            isLoading: false,
            submission: action.submission.submission,
            commentIds: action.submission.commentIds,
            hasMoreComments: action.submission.hasMoreComments,
            moreCommentsCount: action.submission.moreCommentsCount,
            moreCommentsIds: action.submission.moreCommentsIds,
        };
    case REQUEST_MORE_SUBMISSION_COMMENTS:
        return {
            ...state,
            isLoadingMoreComments: true,
        };
    case UPDATE_SUBMISSION_MORE_COMMENTS:
        return {
            ...state,
            isLoadingMoreComments: false,
            hasMoreComments: action.hasMoreComments,
            moreCommentsCount: action.moreCommentsCount,
            moreCommentsIds: action.moreCommentsIds,
        };
    default:
        return state;
    }
}
