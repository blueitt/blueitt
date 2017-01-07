import {
    RECEIVE_SUBREDDIT_SUBMISSIONS,
    RECEIVE_MORE_SUBREDDIT_SUBMISSIONS,
} from 'actions/subreddits';

export default function submissions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SUBREDDIT_SUBMISSIONS:
        case RECEIVE_MORE_SUBREDDIT_SUBMISSIONS:
            const newSubmissions = action.submissions.map(submission => {
                return {
                    [submission.id]: {
                        ...DEFAULT_SUBMISSION_STATE,
                        submission,
                    }
                }
            });

            return Object.assign(
                {},
                state,
                ...newSubmissions,
            );
        default:
            return state;
    }
}

const DEFAULT_SUBMISSION_STATE = {
    submission: null,
    isLoadingComments: false,
    isLoadingMoreComments: false,
}
