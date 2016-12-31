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

export function fetchSubmissions(subreddit) {
    return (dispatch) => {
        dispatch(requestSubmissions(subreddit));

        getRequester()
            .getHot(subreddit)
            .then(submissions => {
                dispatch(receiveSubmissions(subreddit, 'hot', submissions))
            });
    };
}
