import React, { Component, PropTypes } from 'react';
import { Container } from 'reactstrap';

import NavbarContainer from 'containers/NavbarContainer';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return (
            <div>
                <NavbarContainer />

                <Container className="App">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
