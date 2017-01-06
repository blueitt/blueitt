import rootReducer from 'reducers';

export default function deserializeState() {
    const initialState = rootReducer(undefined, { type: undefined });
    return {
        ...initialState,
        auth: {
            ...initialState.auth,
            state: window.localStorage.getItem('REDDIT_OAUTH_STATE'),
        },
    };
}
