import { SAVE_AUTH_STATE, SAVE_ACCESS_TOKEN } from 'actions/auth';

const DEFAULT_AUTH_STATE = {
    state: null,
    accessToken: null,
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
        default:
            return state;
    }
}
