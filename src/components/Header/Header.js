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
import auth, { signOut } from '../../utils/firebase/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLogin } from '../../Redux/Actions/actions';
import PropTypes from 'prop-types';
import {persistStore} from 'redux-persist';

class Header extends Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

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

  logout(e) {
    e.preventDefault();
    console.log("LOGOUT");

    var _this = this;

    signOut();

    persistStore(this.context.store).purge().then((i) => {
      _this.props.setLogin(false);
      _this.props.history.push('/login');
    })
    // TODO sign out not working for redirect
    // this.props.dispatch( { type: 'RESET' });

    // auth.onAuthStateChanged((user) => {
    //   if(user) {
    //     // TODO set login is not defined in this scope
    //     // _this.props.setLogin(false);
    //     _this.props.history.push('/login');
    //   }
    // })
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
              <NavLink href="#" onClick={this.logout}>Log out</NavLink>
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

/**
* Sets props to be accessed by the Header component from redux
* global state. Variables & Objects
*/
function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

/**
* Sets action functions to be used by the Header component through props.
* Functions
*/
function mapDispatchToProps(dispatch) {
  // When setLogin is called, result is passed to all reducers
  return bindActionCreators({ setLogin: setLogin }, dispatch);
}

Header.contextTypes = {
  store: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
