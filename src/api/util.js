import Snoocore from 'snoocore';

// It's called a "reddit" so that snoocore could be changed with some other
// library with minimal changes to the code.
export function getUnauthedReddit() {
    return new Snoocore({
        // eslint-disable-next-line no-undef
        userAgent: WEBPACK_USER_AGENT,
        oauth: {
            type: 'implicit',
            // eslint-disable-next-line no-undef
            key: WEBPACK_OAUTH_KEY,
            secret: '',
            // eslint-disable-next-line no-undef
            redirectUri: `${WEBPACK_AUTH_REDIRECT_HOST}/authenticate`,
            scope: ['read'],
            deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
        },
    });
}

export function getAuthableReddit() {
    return new Snoocore({
        // eslint-disable-next-line no-undef
        userAgent: WEBPACK_USER_AGENT,
        oauth: {
            type: 'explicit',
            duration: 'permanent',
            // eslint-disable-next-line no-undef
            key: WEBPACK_OAUTH_KEY,
            secret: '',
            // eslint-disable-next-line no-undef
            redirectUri: `${WEBPACK_AUTH_REDIRECT_HOST}/authenticate`,
            scope: ['read', 'identity'],
        },
    });
}

export function getAuthUrl(authState) {
    return getAuthableReddit().getAuthUrl(authState);
}

export function getAuthedReddit(accessToken, refreshToken, onSaveAccessToken) {
    const reddit = getAuthableReddit();

    reddit.setAccessToken(accessToken);
    reddit.setRefreshToken(refreshToken);
    reddit.on('access_token_refreshed', onSaveAccessToken);

    return reddit;
}
