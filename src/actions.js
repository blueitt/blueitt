import Snoowrap from 'snoowrap';

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

    console.log(order);

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
        const listing = state.reddit.subreddits[subreddit].submissions[order];

        listing.fetchMore({ amount: 25 })
            .then(submissions => {
                dispatch(receiveSubmissions(subreddit, order, submissions));
            });
    }
}
