import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Chores from '../../views/Chores/Chores';
import GroceryList from '../../views/GroceryList/GroceryList';
import FlatMates from '../../views/FlatMates/FlatMates';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
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
  }
}

export default Full;
