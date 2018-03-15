import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

// Redux Persist
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import reduxReset from 'redux-reset';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/';

import Login from './views/Login';
import Register from './views/Register';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();


ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/login" name="Login" component={Login} />
      <Route path="/register" name="Register" component={Register} />
      <Route path="/dashboard" history={history} name="Home" component={Full} />
      {/* <Redirect from="/" to="/register" /> */}
      <Route path="/" name="Register" component={Register} />
    </Switch>
  </HashRouter>
), document.getElementById('root'));
