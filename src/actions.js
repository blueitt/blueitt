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

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit,
    };
}

// export const FETCH_POSTS = 'FETCH_POSTS';
export function fetchPosts(subreddit) {
    return (dispatch) => {
        dispatch(requestPosts(subreddit));

        getRequester().getHot(subreddit)
            .then(posts => dispatch(receivePosts(subreddit, 'hot', posts)));
    };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(subreddit, order, posts) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        order,
        posts,
    };
}
