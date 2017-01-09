import {
    RECEIVE_SUBMISSION,
} from 'actions/submissions';

import {
    RECEIVE_MORE_COMMENTS,
    REQUEST_MORE_COMMENT_REPLIES,
    APPEND_COMMENT_REPLIES,
    UPDATE_COMMENT_MORE_REPLIES,
} from 'actions/comments';

export default function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SUBMISSION:
            const newComments = action.comments.map(comment => ({
                [comment.comment.id]: {
                    ...DEFAULT_COMMENT_STATE,
                    ...comment,
                },
            }));

            return Object.assign(
                {},
                state,
                ...newComments,
            );
        case RECEIVE_MORE_COMMENTS:
            const commentsById = action.comments.map(comment => ({
                [comment.comment.id]: {
                    ...DEFAULT_COMMENT_STATE,
                    ...comment,
                }
            }));

            return Object.assign(
                {},
                state,
                ...commentsById,
            );
        case APPEND_COMMENT_REPLIES:
        case REQUEST_MORE_COMMENT_REPLIES:
        case UPDATE_COMMENT_MORE_REPLIES:
            return {
                ...state,
                [action.commentId]: comment(state[action.commentId], action),
            };
        default:
            return state;
    }
}

const DEFAULT_COMMENT_STATE = {
    comment: null,
    hasContinueThisThread: null,
    hasMoreReplies: null,
    isLoadingMoreReplies: false,
    moreRepliesCount: null,
    moreRepliesIds: null,
    replyIds: null,
};

function comment(state = DEFAULT_COMMENT_STATE, action) {
    switch (action.type) {
        case REQUEST_MORE_COMMENT_REPLIES:
            return {
                ...state,
                isLoadingMoreReplies: true,
            };
        case APPEND_COMMENT_REPLIES:
            return {
                ...state,
                replyIds: [...state.replyIds, ...action.replyIds],
            };
        case UPDATE_COMMENT_MORE_REPLIES:
            return {
                ...state,
                hasContinueThisThread: action.hasContinueThisThread,
                hasMoreReplies: action.hasMoreReplies,
                moreRepliesCount: action.moreRepliesCount,
                moreRepliesIds: action.moreRepliesIds,
            };
        default:
            return state;
    }
}
