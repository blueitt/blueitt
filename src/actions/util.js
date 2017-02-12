import { saveAccessToken } from 'actions/auth';
import { getAuthedReddit, getUnauthedReddit } from 'api/util';

// eslint-disable-next-line import/prefer-default-export
export function getRedditFromState(state, dispatch) {
    const onSaveAccessToken = (accessToken) => {
        dispatch(saveAccessToken(accessToken));
    };

    if (state.accounts.activeAccount !== null) {
        const auth = state.auth[state.currentAccount];
        return getAuthedReddit(auth.accessToken, auth.refreshToken, onSaveAccessToken);
    }

    return getUnauthedReddit();
}
