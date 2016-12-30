import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import uuid from 'uuid';

export default class UserAuthenticator extends Component {
    // static propTypes = {
    //     onUpdateOauthCode: PropTypes.func.isRequired,
    // };

    componentWillMount() {
        const urlParams = new URL(window.location.href).searchParams;
        const authCode = urlParams.get('code');
        const authState = urlParams.get('state');

        if (authCode) {
            const savedState = window.localStorage.getItem('OAUTH_STATE');

            if (authState === savedState) {
                this.getAndSaveTokens(authCode);
                // window.localStorage.setItem('OAUTH_CODE', authCode);
            } else {
                console.error('TODO: handle OAuth state not matching');
            }
        }
    }

    render() {
        const authState = uuid.v4();
        const authUrl = window.snoowrap.getAuthUrl({
            state: authState,
            scope: ['identity', 'edit', 'read'],
            clientId: 'wxaZ11pMAfDtLw',
            redirectUri: 'http://127.0.0.1:3000/authenticate',
        });

        return (
            <div>
                <h3>Time to authenticate</h3>

                <a
                    href={authUrl}
                    onClick={() => this.saveAuthState(authState)}>
                    Go to reddit
                </a>

                <Link to="/r/all">/r/all</Link>
            </div>
        );
    }

    saveAuthState(authState) {
        window.localStorage.setItem('OAUTH_STATE', authState);
    }

    getAndSaveTokens(authCode) {
        const requesterPromise = snoowrap.fromAuthCode({
            code: authCode,
            userAgent: 'Blueitt v0.0.1',
            clientId: 'wxaZ11pMAfDtLw',
            redirectUri: 'http://127.0.0.1:3000/authenticate',
        });

        requesterPromise
            .then(requester => {
                window.localStorage.setItem('REDDIT_ACCESS_TOKEN', requester.accessToken);
                window.localStorage.setItem('REDDIT_REFRESH_TOKEN', requester.refreshToken);
                //
                // const r = new snoowrap({
                //     userAgent: 'Blueitt v0.0.1',
                //     clientId: 'wxaZ11pMAfDtLw',
                //     redirectUri: 'http://127.0.0.1:3000/authenticate',
                //     accessToken: requester.accessToken,
                //     refreshToken: requester.refreshToken,
                // });
                //
                // r.getHot('all').then(posts => {
                //     debugger;
                // })
            });
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         onUpdateOauthCode: setOauthCode,
//     }, dispatch);
// }
//
// export default connect(null, mapDispatchToProps)(UserAuthenticator);
