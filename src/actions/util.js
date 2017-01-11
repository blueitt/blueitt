import { saveAccessToken } from 'actions/auth';
import { getAuthedReddit } from 'api/util';

// eslint-disable-next-line import/prefer-default-export
export function getAuthedRedditFromState(state, dispatch) {
    const onSaveAccessToken = (accessToken) => {
        dispatch(saveAccessToken(accessToken));
    };

    return getAuthedReddit(state.auth.accessToken, state.auth.refreshToken, onSaveAccessToken);
}
