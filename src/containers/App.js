import React, { Component, PropTypes } from 'react';
import { Container } from 'reactstrap';

import Navbar from 'components/Navbar';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return (
            <div>
                <Navbar />

                <Container className="App">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
