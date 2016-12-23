import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

function redditDatabaseReducer(state = {}, action) {
    return state;
}

const rootReducer = combineReducers({
    redditDatabaseReducer,
    routing: routerReducer
});

export default rootReducer;
