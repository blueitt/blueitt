import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
    REQUEST_SUBMISSIONS, RECEIVE_SUBMISSIONS, REQUEST_MORE_SUBMISSIONS,
    REQUEST_SUBMISSION, RECEIVE_SUBMISSION, REQUEST_MORE_COMMENTS,
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
                    submissions: {
                        ...state[action.subreddit].submissions,
                        [action.order]: [
                            ...action.submissions.map(submission => submission.id)
                        ],
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

function serializeSubmission(submission) {
    return {
        ...submission.toJSON(),
        comments: [...submission.comments.map(c => c.id)],
    };
}

const DEFAULT_SUBMISSION_STATE = {
    isLoading: true,
    submission: null,
};

function submissions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SUBMISSIONS:
            return Object.assign(
                {},
                state,
                ...action.submissions.map(s => ({ [s.id]: serializeSubmission(s) }))
            );
        case REQUEST_SUBMISSION:
            return {
                ...state,
                [action.submissionId]: {
                    ...DEFAULT_SUBMISSION_STATE,
                    isLoading: true,
                },
            };
        case RECEIVE_SUBMISSION:
            return {
                ...state,
                [action.submissionId]: {
                    ...state[action.submissionId],
                    isLoading: false,
                    submission: serializeSubmission(action.submission),
                },
            };
        default:
            return state;
    }
}

function flattenCommentsTree(comment) {
    const replies = [].concat(...comment.replies.map(flattenCommentsTree));

    const serializedComment = {
        ...comment.toJSON(),
        replies: replies.map(c => c.id),
    };

    return [serializedComment, ...replies];
}

function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SUBMISSION:
            const rootComments = action.submission.comments;
            const allComments = [].concat(...rootComments.map(flattenCommentsTree));

            return Object.assign(
                {},
                state,
                ...allComments.map(c => ({ [c.id]: c }))
            )
        default:
            return state;
    }
}

function submissionListings(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: {
                    ...state[action.subreddit],
                    [action.order]: action.submissions,
                },
            };
        default:
            return state;
    }
}

const COMMENT_LISTINGS_DEFAULT_STATE = {
    rootComments: {}, // submissionId -> top-level comments
    replyComments: {}, // commentId -> replies to that comment
};

function getListingsFromSubmission(submission) {
    const replyListings = submission.comments.map(c => getListingsFromComment(c));

    return {
        rootListing: submission.comments,
        replyListings: Object.assign({}, ...replyListings),
    };
}

function getListingsFromComment(comment) {
    const replyListings = comment.replies.map(c => getListingsFromComment(c));
    return Object.assign(
        {},
        { [comment.id]: comment.replies },
        ...replyListings,
    );
}

function commentListings(state = COMMENT_LISTINGS_DEFAULT_STATE, action) {
    switch (action.type) {
        case RECEIVE_SUBMISSION:
            const { rootListing, replyListings } = getListingsFromSubmission(action.submission);

            return {
                ...state,
                rootComments: {
                    ...state.rootComments,
                    [action.submission.id]: rootListing,
                },
                replyComments: Object.assign(
                    {},
                    state.replyComments,
                    replyListings,
                ),
            };
        default:
            return state;
    }
}

const listings = combineReducers({
    submissions: submissionListings,
    comments: commentListings,
});

const reddit = combineReducers({
    subreddits,
    submissions,
    comments,
    listings,
});

export default combineReducers({
    reddit,
    routing: routerReducer
});
