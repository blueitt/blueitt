export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';
export function setCurrentAccount(account) {
    return {
        type: SET_CURRENT_ACCOUNT,
        account,
    };
}
