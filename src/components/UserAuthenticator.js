import React, { Component, PropTypes } from 'react';

import uuid from 'uuid';

import { getAuthUrl, getAuthableReddit } from 'api/util';

export default class UserAuthenticator extends Component {
    static propTypes = {
        onSaveAccountAuthTokens: PropTypes.func.isRequired,
        onSaveAuthState: PropTypes.func.isRequired,
        onSetCurrentAccount: PropTypes.func.isRequired,
        savedAuthState: PropTypes.string,
    };

    constructor(props) {
        super(props);

        const authState = uuid.v4();
        this.authUrl = getAuthUrl(authState);

        this.onAuthButtonClick = (e) => {
            e.preventDefault();

            this.props.onSaveAuthState(authState);
            window.location.href = this.authUrl;
        };
    }

    componentWillMount() {
        const urlParams = window.location.search.split(/(\?|=|&)/);
        if (urlParams.indexOf('code') === -1) {
            return;
        }

        const authCode = urlParams[urlParams.indexOf('code') + 2];
        const authState = urlParams[urlParams.indexOf('state') + 2];

        if (authState === this.props.savedAuthState) {
            const reddit = getAuthableReddit();

            reddit.auth(authCode).then(() => {
                return reddit('/api/v1/me').get();
            }).then((userDetails) => {
                const currentAccount = userDetails.name;
                const accessToken = reddit.oauth.accessToken;
                const refreshToken = reddit.oauth.refreshToken;

                this.props.onSaveAccountAuthTokens(currentAccount, accessToken, refreshToken);
                this.props.onSetCurrentAccount(currentAccount);
            });
        } else {
            // eslint-disable-next-line no-console
            console.error('authState is not correct, possible CSRF?');
        }
    }

    render() {
        return (
            <div>
                <h3>Time to authenticate</h3>

                <a href={this.authUrl} onClick={this.onAuthButtonClick}>
                    Go to reddit
                </a>
            </div>
        );
    }
}
