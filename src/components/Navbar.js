import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Collapse, Container, Nav, Navbar as BSNavbar, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';

import { getAuthUrl } from 'api/util';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.authUrl = getAuthUrl();

        this.state = {
            isOpen: false,
        };
    }

    toggleOpen() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <BSNavbar color="primary" inverse toggleable>
                <NavbarToggler right onClick={() => this.toggleOpen()} />

                <Container>
                    <NavbarBrand tag={Link} to="/">Blueitt</NavbarBrand>

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavLink tag={Link} to="/r/all">/r/all</NavLink>
                        </Nav>
                    </Collapse>

                    <Button
                        color="secondary"
                        outline
                        tag={Link}
                        to="/authenticate"
                    >
                        Log in via Reddit
                    </Button>
                </Container>
            </BSNavbar>
        );
    }
}
