import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { saveAuthState, saveAccessToken } from 'actions';

import UserAuthenticator from 'components/UserAuthenticator';

class UserAuthenticatorContainer extends Component {
    static propTypes = {
        savedAuthState: PropTypes.string,
        onSaveAuthState: PropTypes.func.isRequired,
        onSaveAccessToken: PropTypes.func.isRequired,
    };

    render() {
        return <UserAuthenticator
            savedAuthState={this.props.savedAuthState}
            onSaveAuthState={this.props.onSaveAuthState}
            onSaveAccessToken={this.props.onSaveAccessToken}
        />;
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthenticatorContainer);
