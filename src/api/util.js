import Snoocore from 'snoocore';

// It's called a "reddit" so that snoocore could be changed with some other
// library with minimal changes to the code.
function getUnauthedReddit() {
    return new Snoocore({
        userAgent: 'Blueitt v0.0.1',
        oauth: {
            type: 'explicit',
            duration: 'permanent',
            key: 'wxaZ11pMAfDtLw',
            secret: '',
            redirectUri: 'http://127.0.0.1:3000/authenticate',
            scope: ['read', 'identity'],
        },
    });
}

export function getAuthUrl(authState) {
    return getUnauthedReddit().getAuthUrl(authState);
}

export function getAuthedReddit(accessToken, refreshToken) {
    const reddit = getUnauthedReddit();

    reddit.setAccessToken(accessToken);
    reddit.setRefreshToken(refreshToken);

    return reddit;
}
