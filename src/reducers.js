import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { REQUEST_SUBMISSIONS, RECEIVE_SUBMISSIONS } from 'actions';

const DEFAULT_SUBREDDIT_STATE = {
    isLoading: true,
    submissions: {
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
        case REQUEST_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: {
                    ...DEFAULT_SUBREDDIT_STATE,
                    ...state[action.subreddit],
                    isLoading: true,
                },
            };
        case RECEIVE_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: {
                    ...state[action.subreddit],
                    isLoading: false,
                    submissions: {
                        ...state[action.subreddit].submissions,
                        [action.order]: action.submissions,
                    },
                },
            };
        default:
            return state;
    }
}

const reddit = combineReducers({
    subreddits,
});

export default combineReducers({
    reddit,
    routing: routerReducer
});
