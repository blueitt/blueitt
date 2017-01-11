import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { saveAuthState, saveAccessToken, saveRefreshToken } from 'actions/auth';

import UserAuthenticator from 'components/UserAuthenticator';

class UserAuthenticatorContainer extends Component {
    static propTypes = {
        savedAuthState: PropTypes.string,
        onSaveAccessToken: PropTypes.func.isRequired,
        onSaveAuthState: PropTypes.func.isRequired,
        onSaveRefreshToken: PropTypes.func.isRequired,
    };

    render() {
        return (
            <UserAuthenticator
                savedAuthState={this.props.savedAuthState}
                onSaveAccessToken={this.props.onSaveAccessToken}
                onSaveAuthState={this.props.onSaveAuthState}
                onSaveRefreshToken={this.props.onSaveRefreshToken}
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
        onSaveAuthState: saveAuthState,
        onSaveAccessToken: saveAccessToken,
        onSaveRefreshToken: saveRefreshToken,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthenticatorContainer);
