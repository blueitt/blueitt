import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
    Button,
    Collapse,
    Container,
    Nav,
    Navbar as BSNavbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from 'reactstrap';

import { getAuthUrl } from 'api/util';

export default class Navbar extends Component {
    static propTypes = {
        activeAccount: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.authUrl = getAuthUrl();

        this.state = {
            isOpen: false,
        };

        this.toggleOpen = () => {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        };
    }

    render() {
        return (
            <BSNavbar color="primary" inverse toggleable>
                <NavbarToggler right onClick={this.toggleOpen} />

                <Container>
                    <NavbarBrand tag={Link} to="/">Blueitt</NavbarBrand>

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="mr-auto">
                            <NavLink tag={Link} to="/r/all">/r/all</NavLink>
                        </Nav>

                        {
                            this.props.activeAccount === null
                                ? this.renderLogInButton()
                                : this.renderCurrentAccount()
                        }
                    </Collapse>
                </Container>
            </BSNavbar>
        );
    }

    renderLogInButton() {
        return (
            <Button
                color="secondary"
                outline
                tag={Link}
                to="/authenticate"
            >
                Log in via Reddit
            </Button>
        );
    }

    renderCurrentAccount() {
        return (
            <span className="Navbar-activeAccount">
                Howdy, {this.props.activeAccount}
            </span>
        );
    }
}
