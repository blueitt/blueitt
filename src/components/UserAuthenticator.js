import React, { Component, PropTypes } from 'react';

import uuid from 'uuid';

import { getAuthUrl, getSnoocore } from 'api/util';

export default class UserAuthenticator extends Component {
    static propTypes = {
        savedAuthState: PropTypes.string,
        onSaveAccessToken: PropTypes.func.isRequired,
        onSaveAuthState: PropTypes.func.isRequired,
        onSaveRefreshToken: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const urlParams = window.location.search.split(/(\?|=|&)/);
        if (urlParams.indexOf('code') === -1) {
            return;
        }

        const authCode = urlParams[urlParams.indexOf('code') + 2];
        const authState = urlParams[urlParams.indexOf('state') + 2];

        if (authState === this.props.savedAuthState) {
            const reddit = getSnoocore();

            reddit.auth(authCode).then((refreshToken) => {
                this.props.onSaveRefreshToken(refreshToken);
                this.props.onSaveAccessToken(reddit.getAccessToken());
            });
        } else {
            // eslint-disable-next-line no-console
            console.error('authState is not correct, possible CSRF?');
        }
    }

    saveAuthState(event, authState, authUrl) {
        event.preventDefault();

        this.props.onSaveAuthState(authState);
        window.location.href = authUrl;
    }

    render() {
        const authState = uuid.v4();
        const authUrl = getAuthUrl(authState);
        const onClick = (e => this.saveAuthState(e, authState, authUrl));

        return (
            <div>
                <h3>Time to authenticate</h3>

                <a href={authUrl} onClick={onClick}>
                    Go to reddit
                </a>
            </div>
        );
    }
}
