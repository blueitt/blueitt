import { RECEIVE_SUBMISSION } from 'actions/submissions';

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
};
