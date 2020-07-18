import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import SessionVerifier from "../session-verifier/SessionVerifier";
import Session from "../../services/session";
import optionsRender from "./optionsRender";

const Layout = ({ children, options, title }) => {
    document.title = title;
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const extraOptions = optionsRender(options, history);
    const { name } = Session.getPayload();
    const logout = () => {
        Session.logout();
        history.push('/login');
    }
    return (
        <SessionVerifier>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">{title}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { extraOptions }
                    </Nav>
                    <Nav navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {name}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={logout}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            <Container fluid className="layout-container">
                { children }
            </Container>
        </SessionVerifier>
    )
}
Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        link: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string,
            callback: PropTypes.func,
        }))
    })),
    title: PropTypes.string,
};

Layout.defaultProps = {
    options: [],
    title: 'Dashboard'
};

export default Layout