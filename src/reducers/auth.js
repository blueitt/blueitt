import {
    SAVE_AUTH_STATE,
    SAVE_ACCESS_TOKEN,
    SAVE_REFRESH_TOKEN,
} from 'actions/auth';

const DEFAULT_AUTH_STATE = {
    accessToken: null,
    refreshToken: null,
    state: null,
};

export default function auth(state = DEFAULT_AUTH_STATE, action) {
    switch (action.type) {
    case SAVE_AUTH_STATE:
        return {
            ...state,
            state: action.authState,
        };
    case SAVE_ACCESS_TOKEN:
        return {
            ...state,
            accessToken: action.accessToken,
        };
    case SAVE_REFRESH_TOKEN:
        return {
            ...state,
            refreshToken: action.refreshToken,
        };
    default:
        return state;
    }
}
