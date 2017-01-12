import React, { Component } from 'react';
import { Link } from 'react-router';
import { Collapse, Container, Nav, Navbar as BSNavbar, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

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
                </Container>
            </BSNavbar>
        );
    }
}
