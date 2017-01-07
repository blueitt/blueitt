import {
    REQUEST_SUBREDDIT,
    RECEIVE_SUBREDDIT_SUBMISSIONS,
    REQUEST_MORE_SUBREDDIT_SUBMISSIONS,
    RECEIVE_MORE_SUBREDDIT_SUBMISSIONS,
} from 'actions/subreddits';

export default function subreddits(state = {}, action) {
    switch (action.type) {
        case REQUEST_SUBREDDIT:
        case RECEIVE_SUBREDDIT_SUBMISSIONS:
        case REQUEST_MORE_SUBREDDIT_SUBMISSIONS:
        case RECEIVE_MORE_SUBREDDIT_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: subreddit(state[action.subreddit], action),
            };
        default:
            return state;
    }
}

const DEFAULT_SUBREDDIT_STATE = {
    submissions: {},
};

function subreddit(state = DEFAULT_SUBREDDIT_STATE, action) {
    switch (action.type) {
        case REQUEST_SUBREDDIT:
        case RECEIVE_SUBREDDIT_SUBMISSIONS:
        case REQUEST_MORE_SUBREDDIT_SUBMISSIONS:
        case RECEIVE_MORE_SUBREDDIT_SUBMISSIONS:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    [action.order]: subredditSubmissions(state.submissions[action.order], action),
                },
            };
        default:
            return state;
    }
}

const DEFAULT_SUBREDDIT_SUBMISSIONS_STATE = {
    isLoadingFirst: true,
    isLoadingMore: false,
    submissionIds: null,
    nextSubmissionName: null,
};

function subredditSubmissions(state = DEFAULT_SUBREDDIT_SUBMISSIONS_STATE, action) {
    switch (action.type) {
        case REQUEST_SUBREDDIT:
            return {
                ...state,
                isLoadingFirst: true,
            };
        case RECEIVE_SUBREDDIT_SUBMISSIONS:
            return {
                ...state,
                isLoadingFirst: false,
                submissionIds: action.submissions.map(s => s.id),
                nextSubmissionName: action.nextSubmissionName,
            };
        case REQUEST_MORE_SUBREDDIT_SUBMISSIONS:
            return {
                ...state,
                isLoadingMore: true,
            };
        case RECEIVE_MORE_SUBREDDIT_SUBMISSIONS:
            return {
                ...state,
                isLoadingMore: false,
                submissionIds: [
                    ...state.submissionIds,
                    ...action.submissions.map(s => s.id),
                ],
                nextSubmissionName: action.nextSubmissionName,
            }
        default:
            return state;
    }
}
