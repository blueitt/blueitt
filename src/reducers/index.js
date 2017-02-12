import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import accounts from 'reducers/accounts';
import auth from 'reducers/auth';
import comments from 'reducers/comments';
import submissions from 'reducers/submissions';
import subreddits from 'reducers/subreddits';

const reddit = combineReducers({
    comments,
    submissions,
    subreddits,
});

export default combineReducers({
    accounts,
    auth,
    reddit,
    routing: routerReducer,
});
