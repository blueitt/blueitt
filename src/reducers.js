import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { REQUEST_POSTS, RECEIVE_POSTS } from 'actions';

const DEFAULT_SUBREDDIT_STATE = {
    isLoading: true,
    posts: {
        hot: null,
        new: null,
        rising: null,
        gilded: null,
        topAll: null,
        topMonth: null,
        topWeek: null,
        topDay: null,
        topHour: null,
        controversialAll: null,
        controversialMonth: null,
        controversialWeek: null,
        controversialDay: null,
        controversialHour: null,
    },
};

function subreddits(state = {}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                [action.subreddit]: {
                    ...DEFAULT_SUBREDDIT_STATE,
                    ...state[action.subreddit],
                    isLoading: true,
                },
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                [action.subreddit]: {
                    ...state[action.subreddit],
                    isLoading: false,
                    posts: {
                        ...state[action.subreddit].posts,
                        [action.order]: action.posts,
                    },
                },
            };
        default:
            return state;
    }
}

const reddit = combineReducers({
    // posts,
    subreddits,
});

export default combineReducers({
    reddit,
    routing: routerReducer
});
