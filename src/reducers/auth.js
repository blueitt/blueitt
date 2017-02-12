import {
    SAVE_AUTH_STATE,
    SAVE_ACCOUNT_AUTH_TOKENS,
} from 'actions/auth';

const DEFAULT_AUTH_STATE = {
    tokens: {},
    state: null,
};

export default function auth(state = DEFAULT_AUTH_STATE, action) {
    switch (action.type) {
    case SAVE_AUTH_STATE:
        return {
            ...state,
            state: action.authState,
        };
    case SAVE_ACCOUNT_AUTH_TOKENS:
        return {
            ...state,
            tokens: {
                ...state.tokens,
                [action.account]: {
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken,
                },
            },
        };
    default:
        return state;
    }
}
