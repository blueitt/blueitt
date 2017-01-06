// import Snoowrap from 'snoowrap';

function getRequester() {
    return new Snoowrap({
        userAgent: 'Blueitt v0.0.1',
        clientId: 'wxaZ11pMAfDtLw',
        redirectUri: 'http://127.0.0.1:3000/authenticate',
        accessToken: window.localStorage.getItem('REDDIT_ACCESS_TOKEN'),
        refreshToken: window.localStorage.getItem('REDDIT_REFRESH_TOKEN'),
    });
}

export const REQUEST_SUBMISSIONS = 'REQUEST_SUBMISSIONS';
function requestSubmissions(subreddit) {
    return {
        type: REQUEST_SUBMISSIONS,
        subreddit,
    };
}

export const RECEIVE_SUBMISSIONS = 'RECEIVE_SUBMISSIONS';
function receiveSubmissions(subreddit, order, submissions) {
    return {
        type: RECEIVE_SUBMISSIONS,
        subreddit,
        order,
        submissions,
    };
}

export function fetchSubmissions(subreddit, order) {
    return (dispatch) => {
        dispatch(requestSubmissions(subreddit));

        getSubmissionsForOrder(subreddit, order)
            .then(submissions => {
                dispatch(receiveSubmissions(subreddit, order, submissions));
            });
    };
}

function getSubmissionsForOrder(subreddit, order) {
    const r = getRequester();

    switch (order) {
        case 'hot':
            return r.getHot(subreddit);
        case 'new':
            return r.getNew(subreddit);
        case 'rising':
            return null;
        case 'topAll':
            return r.getTop(subreddit, { time: 'all' });
        case 'topYear':
            return r.getTop(subreddit, { time: 'year' });
        case 'topMonth':
            return r.getTop(subreddit, { time: 'month' });
        case 'topWeek':
            return r.getTop(subreddit, { time: 'week' });
        case 'topDay':
            return r.getTop(subreddit, { time: 'day' });
        case 'topHour':
            return r.getTop(subreddit, { time: 'hour' });
        case 'controversialAll':
            return r.getControversial(subreddit, { time: 'all' });
        case 'controversialYear':
            return r.getControversial(subreddit, { time: 'year' });
        case 'controversialMonth':
            return r.getControversial(subreddit, { time: 'month' });
        case 'controversialWeek':
            return r.getControversial(subreddit, { time: 'week' });
        case 'controversialDay':
            return r.getControversial(subreddit, { time: 'day' });
        case 'controversialHour':
            return r.getControversial(subreddit, { time: 'hour' });
    }
}

export const REQUEST_MORE_SUBMISSIONS = 'REQUEST_MORE_SUBMISSIONS';
function requestMoreSubmissions(subreddit) {
    return {
        type: REQUEST_MORE_SUBMISSIONS,
        subreddit,
    };
}

export function fetchMoreSubmissions(subreddit, order) {
    return (dispatch, getState) => {
        dispatch(requestMoreSubmissions(subreddit));

        const state = getState();
        const listing = state.reddit.listings.submissions[subreddit][order];

        listing.fetchMore({ amount: 25 })
            .then(submissions => {
                dispatch(receiveSubmissions(subreddit, order, submissions));
            });
    }
}

export const REQUEST_SUBMISSION = 'REQUEST_SUBMISSION';
function requestSubmission(submissionId) {
    return {
        type: REQUEST_SUBMISSION,
        submissionId,
    };
}

export const RECEIVE_SUBMISSION = 'RECEIVE_SUBMISSION';
function receiveSubmission(submissionId, submission) {
    return {
        type: RECEIVE_SUBMISSION,
        submissionId,
        submission,
    };
}

export function fetchSubmission(submissionId) {
    return (dispatch) => {
        dispatch(requestSubmission(submissionId));

        getRequester().getSubmission(submissionId).fetch()
            .then(submission => {
                dispatch(receiveSubmission(submissionId, submission));
            });
    };
}

export const REQUEST_MORE_COMMENTS = 'REQUEST_MORE_COMMENTS';
function requestMoreComments(submissionId, parentIsSubmission, parentCommentId) {
    return {
        type: REQUEST_MORE_COMMENTS,
        submissionId,
        parentIsSubmission,
        parentCommentId,
    };
}

export const RECEIVE_MORE_COMMENTS = 'RECEIVE_MORE_COMMENTS';
function receiveMoreComments(submissionId, parentIsSubmission, parentCommentId, comments) {
    return {
        type: RECEIVE_MORE_COMMENTS,
        submissionId,
        parentIsSubmission,
        parentCommentId,
        comments,
    };
}

export function fetchMoreComments(submissionId, fetchRootComments, parentCommentId) {
    return (dispatch, getState) => {
        dispatch(requestMoreComments(submissionId, fetchRootComments, parentCommentId));

        const state = getState();
        const listing = fetchRootComments
            ? state.reddit.listings.comments.rootComments[submissionId]
            : state.reddit.listings.comments.replyComments[parentCommentId];

        listing.fetchMore({ amount: 25 })
            .then(comments => {
                dispatch(receiveMoreComments(submissionId, fetchRootComments, parentCommentId, comments));
            })
    }
}

export const SAVE_AUTH_STATE = 'SAVE_AUTH_STATE';
export function saveAuthState(authState) {
    return {
        type: SAVE_AUTH_STATE,
        authState,
    };
}

export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
export function saveAccessToken(accessToken) {
    return {
        type: SAVE_ACCESS_TOKEN,
        accessToken,
    };
}
