import { saveAccessToken } from 'actions/auth';
import { getAuthedReddit, getUnauthedReddit } from 'api/util';

// eslint-disable-next-line import/prefer-default-export
export function getRedditFromState(state, dispatch) {
    const onSaveAccessToken = (accessToken) => {
        dispatch(saveAccessToken(accessToken));
    };

    if (state.accounts.activeAccount !== null) {
        const tokens = state.auth.tokens[state.accounts.activeAccount];
        return getAuthedReddit(tokens.accessToken, tokens.refreshToken, onSaveAccessToken);
    }

    return getUnauthedReddit();
}
