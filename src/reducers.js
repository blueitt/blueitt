import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
    REQUEST_SUBMISSIONS, RECEIVE_SUBMISSIONS, REQUEST_MORE_SUBMISSIONS,
    REQUEST_SUBMISSION, RECEIVE_SUBMISSION, REQUEST_MORE_COMMENTS, RECEIVE_MORE_COMMENTS
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
    isLoadingMoreComments: false,
    submission: null,
    hasMoreComments: false,
    moreCommentsCount: null,
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
            const hasMoreComments = !action.submission.comments.isFinished;
            const moreCommentsCount = hasMoreComments
                ? action.submission.comments._more.count
                : null;

            return {
                ...state,
                [action.submissionId]: {
                    ...state[action.submissionId],
                    isLoading: false,
                    submission: serializeSubmission(action.submission),
                    hasMoreComments,
                    moreCommentsCount,
                },
            };
        case REQUEST_MORE_COMMENTS:
            if (action.parentIsSubmission) {
                return {
                    ...state,
                    [action.submissionId]: {
                        ...state[action.submissionId],
                        isLoadingMoreComments: true,
                    }
                }
            } else {
                return state;
            }
        case RECEIVE_MORE_COMMENTS:
            if (action.parentIsSubmission) {
                const comments = [...action.comments.map(c => c.id)];
                const hasMoreComments = !action.comments.isFinished;
                const moreCommentsCount = hasMoreComments
                    ? action.comments._more.count
                    : null;

                const newSubmission = {
                    ...state[action.submissionId],
                    isLoadingMoreComments: false,
                    hasMoreComments,
                    moreCommentsCount,
                    submission: {
                        ...state[action.submissionId].submission,
                        comments,
                    },
                };

                return {
                    ...state,
                    [action.submissionId]: newSubmission,
                };
            } else {
                return state;
            }
        default:
            return state;
    }
}

const DEFAULT_COMMENT_STATE = {
    comment: null,
    isLoadingMoreReplies: false,
    hasMoreReplies: false,
    moreRepliesCount: null,
};

function flattenCommentsTree(comment) {
    const hasMoreReplies = !comment.replies.isFinished;

    const moreRepliesCount = hasMoreReplies
        ? (comment.replies._more ? comment.replies._more.count : null)
        : null;

    const serializedComment = {
        ...DEFAULT_COMMENT_STATE,
        hasMoreReplies,
        moreRepliesCount,
        comment: {
            ...comment.toJSON(),
            replies: [...comment.replies.map(c => c.id)],
        },
    };

    return Object.assign(
        {},
        { [comment.id]: serializedComment },
        ...comment.replies.map(reply => flattenCommentsTree(reply)),
    );
}

function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SUBMISSION:
            return Object.assign(
                {},
                state,
                ...action.submission.comments.map(c => flattenCommentsTree(c)),
            );
        case REQUEST_MORE_COMMENTS:
            if (action.parentIsSubmission) {
                return state;
            }

            return {
                ...state,
                [action.parentCommentId]: {
                    ...state[action.parentCommentId],
                    isLoadingMoreReplies: true,
                }
            }
        case RECEIVE_MORE_COMMENTS:
            const newComments = action.comments.map(c => flattenCommentsTree(c));
            if (action.parentIsSubmission) {
                return Object.assign(
                    {},
                    state,
                    ...newComments,
                );
            }

            const hasMoreReplies = !action.comments.isFinished;

            const moreRepliesCount = hasMoreReplies
                ? (action.comments._more ? action.comments._more.count : null)
                : null;

            const updatedComment = {
                ...state[action.parentCommentId],
                isLoadingMoreReplies: false,
                hasMoreReplies,
                moreRepliesCount,
                comment: {
                    ...state[action.parentCommentId].comment,
                    replies: [...action.comments.map(c => c.id)],
                },
            };

            return Object.assign(
                {},
                state,
                { [action.parentCommentId]: updatedComment },
                ...newComments,
            );
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
    return {
        rootListing: submission.comments,
        replyListings: getListingsFromCommentList(submission.comments),
    };
}

function getListingsFromCommentList(commentList) {
    const listings = commentList.map(c => getListingsFromComment(c));
    return Object.assign({}, ...listings);
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
        case RECEIVE_MORE_COMMENTS:
            const commentReplyListings = getListingsFromCommentList(action.comments);

            if (action.parentIsSubmission) {
                return {
                    ...state,
                    rootComments: {
                        ...state.rootComments,
                        [action.submissionId]: action.comments,
                    },
                    replyComments: Object.assign(
                        {},
                        state.replyComments,
                        commentReplyListings,
                    ),
                };
            } else {
                return {
                    ...state,
                    replyComments: Object.assign(
                        {},
                        state.replyComments,
                        { [action.parentCommentId]: action.comments },
                        commentReplyListings,
                    ),
                };
            }
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
