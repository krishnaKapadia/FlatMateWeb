import React, { Component } from 'react';
import HeaderDropdown from './HeaderDropdown';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  Badge,
} from 'reactstrap';

class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>

        <NavbarBrand />

        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>

        {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler> */}
        {/* <HeaderDropdown/> */}

        <Nav className="d-md-down-none" pills>
          <NavItem>
            <NavLink href="#" onClick={this.asideToggle}>Settings</NavLink>
          </NavItem>

          <NavItem>
              <NavLink href="#">Log out</NavLink>
          </NavItem>

        </Nav>
        {/* TODO: User profile image */}
{/*
        <Nav navbar>
          <HeaderDropdown />
        </Nav> */}


      </header>
    )
  }
}

export default Header;