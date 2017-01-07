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
        dispatch(requestMoreSubmissions(subreddit));
    //
    //     const state = getState();
    //     const listing = state.reddit.listings.submissions[subreddit][order];
    //
    //     listing.fetchMore({ amount: 25 })
    //         .then(submissions => {
    //             dispatch(receiveSubmissions(subreddit, order, submissions));
    //         });
    }
}
