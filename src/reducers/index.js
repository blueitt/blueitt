import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from 'reducers/auth';
import subreddits from 'reducers/subreddits';
import submissions from 'reducers/submissions';
import comments from 'reducers/comments';

const reddit = combineReducers({
    subreddits,
    submissions,
    comments,
});

export default combineReducers({
    auth,
    reddit,
    routing: routerReducer,
});
