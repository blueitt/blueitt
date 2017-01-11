import { getAuthedReddit } from 'api/util';

// eslint-disable-next-line import/prefer-default-export
export function getAuthedRedditFromState(state) {
    return getAuthedReddit(state.auth.accessToken, state.auth.refreshToken);
}
