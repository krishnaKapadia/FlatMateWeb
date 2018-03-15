import React, {Component} from 'react';
import {
  Container, Row, Col, CardGroup, Card, CardBody, Button, Input,
  InputGroup, InputGroupAddon, Form
} from 'reactstrap';
import { registerWithLocalCredentials } from '../../utils/firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-spinkit';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: ''
    }

    this.register = this.register.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
  * Registers entered user credentials with backend API by first creating a Company
  */
  register(data) {
    const userCredentials = {
      username: data.get("username"),
      password: data.get("password"),
      email: data.get("email")
    }

    registerWithLocalCredentials(userCredentials.email, userCredentials.password).then((user) => {
      this.setState({ loading: false });
      this.props.history.push('/login');
      console.log(user);
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
    this.register(data);
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
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <Form onSubmit={this.handleSubmit}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon>@</InputGroupAddon>
                        <Input type="text" placeholder="Email" name="email" required />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                        <Input type="text" placeholder="Username" name="username" required />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" required />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                        <Input type="password" placeholder="Repeat password" required/>
                      </InputGroup>
                      {
                        this.state.error !== '' && <p><small className="error">{this.state.error}</small></p>
                      }
                      <Row>
                        <Col xs="6">
                          {
                            this.state.loading &&  <Button color="success" className="px-4"><Spinner name="circle" color="white" fadeIn="none" /></Button>
                          }
                          {
                            !this.state.loading && <Button type="submit" color="success" block>Create Account</Button>
                          }
                        </Col>

                      </Row>

                    </Form>

                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Login</h2>
                      <p>If you already have an account then just login!</p>
                      <Button color="primary" className="mt-3" onClick={() => this.props.history.push('/login')} active>Login!</Button>
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

export default Register;
