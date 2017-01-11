export const SAVE_AUTH_STATE = 'SAVE_AUTH_STATE';
export function saveAuthState(authState) {
    return {
        type: SAVE_AUTH_STATE,
        authState,
    };
}

export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
export function saveAccessToken(accessToken) {
    return {
        type: SAVE_ACCESS_TOKEN,
        accessToken,
    };
}

export const SAVE_REFRESH_TOKEN = 'SAVE_REFRESH_TOKEN';
export function saveRefreshToken(refreshToken) {
    return {
        type: SAVE_REFRESH_TOKEN,
        refreshToken,
    };
}
