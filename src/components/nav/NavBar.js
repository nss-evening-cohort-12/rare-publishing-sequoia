import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from 'reactstrap';


import { NavLink as RRNavLink } from 'react-router-dom';

import './NavBar.css';

class NavBar extends React.Component {
    state = {
        authed: false,
        isOpen: false,
    }

    componentDidMount() {
        this.authed();
    }

    authed = () => {
        if (localStorage.getItem("rare_user_id")) {
            this.setState({ authed: true })
        }
    }

    signOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("rare_user_id")
        this.setState({ authed: false })
    }

    toggle = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render() {
        const { authed, isOpen } = this.state;
        const buildNav = () => {
            if (authed) {
                return (
                    <Nav className="container-fluid" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Posts
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink className="lnk" tag={RRNavLink} to='/posts'>View Posts</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="lnk" tag={RRNavLink} to='/newpost'>New Post</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="lnk" tag={RRNavLink} to='/posts'>My Posts</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink className="lnk" tag={RRNavLink} to='/categories'>Category Management</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Tags
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink className="lnk" tag={RRNavLink} to='/tags'>View Tags</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="lnk" tag={RRNavLink} to='/newtag'>New Tag</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="lnk" tag={RRNavLink} to='/tags'>My Tags</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem className="ml-auto">
                            <NavLink className="lnk" onClick={this.signOut}>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                );
            }
            return <Nav className="container-fluid" navbar>
                <NavItem className="ml-auto">
                    <NavLink className="lnk" tag={RRNavLink} to='/login'>Log In</NavLink>
                </NavItem>
            </Nav>;
        };

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand className="lnk" tag={RRNavLink} to='/'>RARE Publishing</NavbarBrand>
                    <NavbarToggler className="" onClick={this.toggle} />
                    <Collapse className="nav-coll" isOpen={isOpen} navbar>
                        <Nav className="container-fluid" navbar>
                            {buildNav()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
