export const SAVE_AUTH_STATE = 'SAVE_AUTH_STATE';
export function saveAuthState(authState) {
    return {
        type: SAVE_AUTH_STATE,
        authState,
    };
}

export const SAVE_ACCOUNT_AUTH_TOKENS = 'SAVE_ACCOUNT_AUTH_TOKENS';
export function saveAccountAuthTokens(account, accessToken, refreshToken) {
    return {
        type: SAVE_ACCOUNT_AUTH_TOKENS,
        account,
        accessToken,
        refreshToken,
    };
}
