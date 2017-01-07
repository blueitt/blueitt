import * as api from 'api';

export const REQUEST_SUBREDDIT = 'REQUEST_SUBREDDIT';
export function requestSubreddit(subreddit, order) {
    return {
        type: REQUEST_SUBREDDIT,
        subreddit,
        order,
    };
}

export const RECEIVE_SUBREDDIT_SUBMISSIONS = 'RECEIVE_SUBREDDIT_SUBMISSIONS';
export function receiveSubredditSubmissions(subreddit, order, submissions, nextSubmissionName) {
    return {
        type: RECEIVE_SUBREDDIT_SUBMISSIONS,
        subreddit,
        order,
        submissions,
        nextSubmissionName,
    };
}

export const REQUEST_MORE_SUBREDDIT_SUBMISSIONS = 'REQUEST_MORE_SUBREDDIT_SUBMISSIONS';
export function requestMoreSubredditSubmissions(subreddit, order) {
    return {
        type: REQUEST_MORE_SUBREDDIT_SUBMISSIONS,
        subreddit,
        order,
    };
}

export const RECEIVE_MORE_SUBREDDIT_SUBMISSIONS = 'RECEIVE_MORE_SUBREDDIT_SUBMISSIONS';
export function receiveMoreSubredditSubmissions(subreddit, order, submissions, nextSubmissionName) {
    return {
        type: RECEIVE_MORE_SUBREDDIT_SUBMISSIONS,
        subreddit,
        order,
        submissions,
        nextSubmissionName,
    };
}

export function fetchSubreddit(subreddit, order) {
    return (dispatch, getState) => {
        dispatch(requestSubreddit(subreddit, order));

        const token = getState().auth.accessToken;

        api.getSubredditSubmissions(token, subreddit, order)
            .then(listing => {
                const submissions = listing.data.children.map(c => c.data);
                const nextSubmissionName = listing.data.after;

                dispatch(receiveSubredditSubmissions(subreddit, order, submissions, nextSubmissionName));
            });
    };
}

export function fetchMoreSubmissions(subreddit, order) {
    return (dispatch, getState) => {
        dispatch(requestMoreSubredditSubmissions(subreddit, order));

        const state = getState();
        const token = state.auth.accessToken;
        const nextSubmissionName = state.reddit.subreddits[subreddit].submissions[order].nextSubmissionName;

        api.getSubredditSubmissions(token, subreddit, order, nextSubmissionName)
            .then(listing => {
                const submissions = listing.data.children.map(c => c.data);
                const nextSubmissionName = listing.data.after;

                dispatch(receiveMoreSubredditSubmissions(subreddit, order, submissions, nextSubmissionName));
            });
    }
}
