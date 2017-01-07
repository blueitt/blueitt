import React, { Component, PropTypes } from 'react';

import uuid from 'uuid';

import { getAuthUrl } from 'api';

export default class UserAuthenticator extends Component {
    static propTypes = {
        savedAuthState: PropTypes.string,
        onSaveAuthState: PropTypes.func.isRequired,
        onSaveAccessToken: PropTypes.func.isRequired,
    };

    getUnauthedReddit() {
    }

    componentWillMount() {
        const hashParams = window.location.hash.split(/(#|=|&)/);
        if (hashParams.indexOf('access_token') === -1) {
            return;
        }

        const accessToken = hashParams[hashParams.indexOf('access_token') + 2];
        const authState = hashParams[hashParams.indexOf('state') + 2];

        if (authState === this.props.savedAuthState) {
            this.props.onSaveAccessToken(accessToken);
        } else {
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

        return (
            <div>
                <h3>Time to authenticate</h3>

                <a
                    href={authUrl}
                    onClick={(e) => this.saveAuthState(e, authState, authUrl)}>
                    Go to reddit
                </a>
            </div>
        );
    }
}
