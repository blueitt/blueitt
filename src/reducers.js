import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
    REQUEST_SUBMISSIONS, RECEIVE_SUBMISSIONS, REQUEST_MORE_SUBMISSIONS,
    REQUEST_SUBMISSION_COMMENTS, RECEIVE_SUBMISSION_COMMENTS, REQUEST_MORE_COMMENTS,
} from 'actions';

const DEFAULT_SUBREDDIT_STATE = {
    isLoading: true,
    isLoadingMore: false,
    submissions: {
        hot: null,
        new: null,
        rising: null,
        gilded: null,
        topAll: null,
        topMonth: null,
        topWeek: null,
        topDay: null,
        topHour: null,
        controversialAll: null,
        controversialMonth: null,
        controversialWeek: null,
        controversialDay: null,
        controversialHour: null,
    },
};

function subreddits(state = {}, action) {
    switch (action.type) {
        case REQUEST_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: {
                    ...DEFAULT_SUBREDDIT_STATE,
                    ...state[action.subreddit],
                    isLoading: true,
                },
            };
        case RECEIVE_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: {
                    ...state[action.subreddit],
                    isLoading: false,
                    isLoadingMore: false,
                    submissions: {
                        ...state[action.subreddit].submissions,
                        [action.order]: action.submissions,
                    },
                },
            };
        case REQUEST_MORE_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: {
                    ...state[action.subreddit],
                    isLoadingMore: true,
                },
            };
        default:
            return state;
    }
}

const DEFAULT_SUBMISSION_STATE = {
    isLoading: true,
    submission: null,
};

function submissions(state = {}, action) {
    switch (action.type) {
        case REQUEST_SUBMISSION_COMMENTS:
            return {
                ...state,
                [action.submissionId]: {
                    ...DEFAULT_SUBMISSION_STATE,
                    ...state[action.submissionId],
                    isLoading: true,
                },
            };
        case RECEIVE_SUBMISSION_COMMENTS:
            return {
                ...state,
                [action.submissionId]: {
                    ...state[action.submissionId],
                    isLoading: false,
                    submission: makeLoadingMoreComments(action.submission, false, null),
                },
            };
        case REQUEST_MORE_COMMENTS:
            return {
                ...state,
                [action.submissionId]: {
                    ...state[action.submissionId],
                    submission: makeLoadingMoreComments(
                        state[action.submissionId].submission,
                        action.parentIsSubmission,
                        action.parentCommentId
                    ),
                },
            }
        default:
            return state;
    }
}

// If `markRootComments`, mark the root comments be loading more. Also, mark
// any comments with id `parentCommentId` as loading more.
function makeLoadingMoreComments(submission, markRootComments, parentCommentId) {
    const result = submission._clone();

    if (result.comments._more === null) {
        result.comments._more = {};
    }

    result.comments._more.isLoadingMore = markRootComments;

    result.comments = result.comments.map(comment => {
        return makeCommentLoadingMoreComments(comment, parentCommentId);
    });

    return result;
}

function makeCommentLoadingMoreComments(comment, parentCommentId) {
    const result = comment._clone();

    if (result.replies._more === null) {
        result.replies._more = {};
    }

    result.replies._more.isLoadingMore = result.id === parentCommentId;

    result.replies = result.replies.map(reply => {
        return makeCommentLoadingMoreComments(reply, parentCommentId);
    });

    return result;
}

const reddit = combineReducers({
    subreddits,
    submissions,
});

export default combineReducers({
    reddit,
    routing: routerReducer
});
