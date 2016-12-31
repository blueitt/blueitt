import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { REQUEST_SUBMISSIONS, RECEIVE_SUBMISSIONS, REQUEST_MORE_SUBMISSIONS } from 'actions';

const DEFAULT_SUBREDDIT_STATE = {
    isLoading: true,
    isLoadingMore: false,
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
                    isLoadingMore: false,
                    submissions: {
                        ...state[action.subreddit].submissions,
                        [action.order]: action.submissions,
                    },
                },
            };
        case REQUEST_MORE_SUBMISSIONS:
            return {
                ...state,
                [action.subreddit]: {
                    ...state[action.subreddit],
                    isLoadingMore: true,
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
