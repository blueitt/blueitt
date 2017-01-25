import React, { Component, PropTypes } from 'react';

import uuid from 'uuid';

import { getAuthUrl, getUnauthedReddit } from 'api/util';

export default class UserAuthenticator extends Component {
    static propTypes = {
        savedAuthState: PropTypes.string,
        onSaveAccessToken: PropTypes.func.isRequired,
        onSaveAuthState: PropTypes.func.isRequired,
        onSaveRefreshToken: PropTypes.func.isRequired,
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
            const reddit = getUnauthedReddit();

            reddit.auth(authCode).then((refreshToken) => {
                this.props.onSaveAccessToken(reddit.oauth.accessToken);
                this.props.onSaveRefreshToken(refreshToken);
            });

            // const reddit = getSnoocore();
            //
            // reddit.auth(authCode).then((refreshToken) => {
            //     this.props.onSaveRefreshToken(refreshToken);
            //     this.props.onSaveAccessToken(reddit.getAccessToken());
            // });
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
