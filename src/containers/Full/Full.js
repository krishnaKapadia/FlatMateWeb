import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Login from '../../views/Login';
import Register from '../../views/Register';
import Dashboard from '../../views/Dashboard/';
import Chores from '../../views/Chores/Chores';
import GroceryList from '../../views/GroceryList/GroceryList';
import FlatMates from '../../views/FlatMates/FlatMates';

// TODO sessions after login, probably use redux to store user logged in state
class Full extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // if(this.props.isLoggedIn) {
      console.log(this.props.isLoggedIn);
    // }
  }

  render() {

    if(this.props.isLoggedIn) {
      return (
        <div className="app">
          <Header history={this.props.history}/>
          <div className="app-body">
            <Sidebar {...this.props}/>
            <main className="main">
              <Breadcrumb />
              <Container fluid>
                <Switch>
                  <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                  <Route path="/chores" name="Chores" component={Chores} />
                  <Route path="/groceries" name="Groceries" component={GroceryList} />
                  <Route path="/FlatMates" name="FlatMates" component={FlatMates} />
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>

          <Footer />
        </div>
      );
    } else {
      return(
        <div>
          <Switch>
            <Route path="/login" name="Login" component={Login} />
            <Route path="/register" name="Register" component={Register} />
            <Redirect from="/" to="/login"/>
          </Switch>
        </div>
      );
    }
  }
}

/**
* Sets props to be accessed by the component from redux
* global state
*/
function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

// Global store connection
export default connect(mapStateToProps)(Full);
