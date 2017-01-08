import {
    RECEIVE_SUBREDDIT_SUBMISSIONS,
    RECEIVE_MORE_SUBREDDIT_SUBMISSIONS,
} from 'actions/subreddits';

import {
    REQUEST_SUBMISSION,
    RECEIVE_SUBMISSION,
} from 'actions/submissions';

export default function submissions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SUBREDDIT_SUBMISSIONS:
        case RECEIVE_MORE_SUBREDDIT_SUBMISSIONS:
            const newSubmissions = action.submissions.map(submission => ({
                [submission.id]: {
                    ...DEFAULT_SUBMISSION_STATE,
                    submission,
                }
            }));

            return Object.assign(
                {},
                state,
                ...newSubmissions,
            );
        case REQUEST_SUBMISSION:
        case RECEIVE_SUBMISSION:
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
        default:
            return state;
    }
}
