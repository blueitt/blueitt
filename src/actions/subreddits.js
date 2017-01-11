import { getAuthedRedditFromState } from 'actions/util';
import { getSubredditSubmissions } from 'api/subreddits';

export const REQUEST_SUBREDDIT = 'REQUEST_SUBREDDIT';
function requestSubreddit(subreddit, order) {
    return {
        type: REQUEST_SUBREDDIT,
        subreddit,
        order,
    };
}

export const RECEIVE_SUBREDDIT_SUBMISSIONS = 'RECEIVE_SUBREDDIT_SUBMISSIONS';
function receiveSubredditSubmissions(subreddit, order, submissions, nextSubmissionName) {
    return {
        type: RECEIVE_SUBREDDIT_SUBMISSIONS,
        subreddit,
        order,
        submissions,
        nextSubmissionName,
    };
}

export const REQUEST_MORE_SUBREDDIT_SUBMISSIONS = 'REQUEST_MORE_SUBREDDIT_SUBMISSIONS';
function requestMoreSubredditSubmissions(subreddit, order) {
    return {
        type: REQUEST_MORE_SUBREDDIT_SUBMISSIONS,
        subreddit,
        order,
    };
}

export const RECEIVE_MORE_SUBREDDIT_SUBMISSIONS = 'RECEIVE_MORE_SUBREDDIT_SUBMISSIONS';
function receiveMoreSubredditSubmissions(subreddit, order, submissions, nextSubmissionName) {
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

        const state = getState();
        const reddit = getAuthedRedditFromState(state, dispatch);

        getSubredditSubmissions(reddit, subreddit, order)
            .then(({ submissions, nextSubmissionName }) => {
                dispatch(receiveSubredditSubmissions(subreddit, order, submissions, nextSubmissionName));
            });
    };
}

export function fetchMoreSubmissions(subreddit, order) {
    return (dispatch, getState) => {
        dispatch(requestMoreSubredditSubmissions(subreddit, order));

        const state = getState();
        const reddit = getAuthedRedditFromState(state, dispatch);
        const nextSubmissionName =
            state.reddit.subreddits[subreddit].submissions[order].nextSubmissionName;

        getSubredditSubmissions(reddit, subreddit, order, nextSubmissionName)
            .then(({ submissions, nextSubmissionName: newNextSubmission }) => {
                dispatch(receiveMoreSubredditSubmissions(subreddit, order, submissions, newNextSubmission));
            });
    };
}
