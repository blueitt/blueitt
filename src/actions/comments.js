export const RECEIVE_MORE_COMMENTS = 'RECEIVE_MORE_COMMENTS';
export function receiveMoreComments(comments) {
    return {
        type: RECEIVE_MORE_COMMENTS,
        comments,
    };
}

export const REQUEST_MORE_COMMENT_REPLIES = 'REQUEST_MORE_COMMENT_REPLIES';
export function requestMoreCommentReplies(commentId) {
    return {
        type: REQUEST_MORE_COMMENT_REPLIES,
        commentId,
    };
}

export const APPEND_COMMENT_REPLIES = 'APPEND_COMMENT_REPLIES';
export function appendCommentReplies(commentId, replyIds) {
    return {
        type: APPEND_COMMENT_REPLIES,
        commentId,
        replyIds,
    };
}

export const UPDATE_COMMENT_MORE_REPLIES = 'UPDATE_COMMENT_MORE_REPLIES';
export function updateCommentMoreReplies(commentId,
        hasContinueThisThread, hasMoreReplies, moreRepliesCount, moreRepliesIds) {
    return {
        type: UPDATE_COMMENT_MORE_REPLIES,
        commentId,
        hasContinueThisThread,
        hasMoreReplies,
        moreRepliesCount,
        moreRepliesIds,
    };
}
