import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Navbar from 'components/Navbar';

class NavbarContainer extends Component {
    static propTypes = {
        activeAccount: PropTypes.string,
    };

    render() {
        return (
            <Navbar
                activeAccount={this.props.activeAccount}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        activeAccount: state.accounts.activeAccount,
    };
}

export default connect(mapStateToProps, null)(NavbarContainer);
