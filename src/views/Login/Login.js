import React, {Component} from 'react';
import {
  Container, Row, Col, CardGroup, Card, CardBody, Button, Input,
  InputGroup, InputGroupAddon, Form, FormFeedback }
from 'reactstrap';
import { loginWithLocalCredentials } from '../../utils/firebase/auth';
import { getUser } from '../../utils/firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLogin, setLocalUser } from '../../Redux/Actions/actions';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: ''
    }

    this.handleSubmit      = this.handleSubmit.bind(this);
    this.authenticateLogin = this.authenticateLogin.bind(this);
  }

  /**
  * Authenticates entered user credentials with backend API
  */
  authenticateLogin(data) {
    const userCredentials = {
      email: data.get("email"),
      password: data.get("password")
    }

    loginWithLocalCredentials(userCredentials.email, userCredentials.password).then((user) => {
      this.setState({ loading: false });
      this.props.setLogin(true);

      var _this = this;
      getUser(user.uid).then((user_data) => {
        _this.props.setLocalUser(user_data);
        this.props.history.push('/flatmates');
      }).catch((err) => {
        if(err) console.log(err);
      })
    }).catch((err) => {
      this.setState({ loading: false, error: err.message });
      if(err) console.log(err);
    })
  }

  /**
  * Handles the submittion of the login and delegates to authenticateLogin
  */
  handleSubmit(e) {
    e.preventDefault();

    // Set loading state to true
    this.setState({ loading: true });

    // Create object from form data
    const data = new FormData(e.target);

    // Delegate
    this.authenticateLogin(data);
  }

  render() {
    return (
      <div className="app flex-row align-items-center coverBackground">
        <ToastContainer />
        <Container>
          <Row className="justify-content-center fadeIn">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>

                    <Form onSubmit={this.handleSubmit}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon className='input-group-prepend'><i className="icon-envelope input-group-text"></i></InputGroupAddon>
                        <Input type="text" placeholder="email" name="email" required/>
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" required/>
                      </InputGroup>
                        {
                          this.state.error !== '' &&
                            <p className="error"><small>{this.state.error}</small></p>
                        }
                      <Row>
                        <Col xs="6">
                          {
                            this.state.loading &&  <Button color="primary" className="px-4"><Spinner name="circle" color="white" fadeIn="none" /></Button>
                          }
                          {
                            !this.state.loading && <Button type="submit" color="primary" className="px-4">Login</Button>
                          }

                        </Col>
                      </Row>

                    </Form>

                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Sign up to the Orion Invoices platform to start saving
                        time and help to better manage your business.</p>
                      <Button color="primary" className="mt-3" onClick={() => this.props.history.push('/register')} active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

/**
* Sets props to be accessed by the Login component from redux
* global state, Variables & Objects
*/
function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn, local_user: state.local_user
  }
}

/**
* Sets action functions to be used by the Login component through props
* Functions
*/
function mapDispatchToProps(dispatch) {
  // When setLogin is called, result is passed to all reducers
  return bindActionCreators({ setLogin: setLogin, setLocalUser: setLocalUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
