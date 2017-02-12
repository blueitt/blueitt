import { SET_CURRENT_ACCOUNT } from 'actions/accounts';

const DEFAULT_ACCOUNTS_STATE = {
    activeAccount: null,
};

export default function accounts(state = DEFAULT_ACCOUNTS_STATE, action) {
    switch (action.type) {
    case SET_CURRENT_ACCOUNT:
        return {
            ...state,
            activeAccount: action.account,
        };
    default:
        return state;
    }
}
