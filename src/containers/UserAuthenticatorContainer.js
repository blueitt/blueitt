import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCurrentAccount } from 'actions/accounts';
import { saveAuthState, saveAccountAuthTokens } from 'actions/auth';

import UserAuthenticator from 'components/UserAuthenticator';

class UserAuthenticatorContainer extends Component {
    static propTypes = {
        onSaveAccountAuthTokens: PropTypes.func.isRequired,
        onSaveAuthState: PropTypes.func.isRequired,
        onSetCurrentAccount: PropTypes.func.isRequired,
        savedAuthState: PropTypes.string,
    };

    render() {
        return (
            <UserAuthenticator
                onSaveAccountAuthTokens={this.props.onSaveAccountAuthTokens}
                onSaveAuthState={this.props.onSaveAuthState}
                onSetCurrentAccount={this.props.onSetCurrentAccount}
                savedAuthState={this.props.savedAuthState}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        savedAuthState: state.auth.state,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSaveAccountAuthTokens: saveAccountAuthTokens,
        onSaveAuthState: saveAuthState,
        onSetCurrentAccount: setCurrentAccount,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthenticatorContainer);
