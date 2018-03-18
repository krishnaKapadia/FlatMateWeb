import React, { Component } from 'react';
import { getFlatMates } from '../../utils/firebase/firebase';
import FlatMate from './FlatMate';
import { Row, Col, Card, CardBody, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Input, InputGroup, InputGroupAddon
} from 'reactstrap';

import QRCode from 'qrcode.react';
import classnames from 'classnames';

class FlatMates extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flatmates: [],
      size: 0,
      showModal: false,
      activeTab: 'qr'
    }

    this.inviteUrl = ""
    this.toggleInvite = this.toggleInvite.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // TODO, connect to redux, use that local_user.flatKey for this query
    this.inviteUrl = `${this.props.local_user.flatKey}`;
    // Get flatmates
    getFlatMates(this.flatId).then((res) => {
      // console.log(res);
      this.setState({ flatmates: res.flatmates, size: res.size });
    });
  }

  /**
  * Toggles the invite modal
  */
  toggleInvite() {
    this.setState({ showModal: !this.state.showModal });
  }

  /**
  * Toggles the active invite method tab
  */
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={{ size: 12 }} md={{ size: 4 }} lg={{ size: 4 }}>

            <Card>
              <CardBody>
                <h3><i className="icon-event blue paddingRight" /> Flat mates: {this.state.size}</h3>
              </CardBody>
            </Card>
          </Col>

          <Col xs={{ size: 0 }} md={{ size: 4 }} lg={{ size: 4 }}>
            {/* EMPTY */}
          </Col>

          <Col xs={{ size: 12 }} md={{ size: 4 }} lg={{ size: 4 }}>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Button className="fullWidthButton" onClick={() => this.toggleInvite()} color='primary'> Invite new flatmate</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

        </Row>

        <Row>
          {
            this.state.flatmates.map((flatmate) => {
              var size = 0;
              return(
                <Col xs="12" md="6" lg="5" key={size++}>
                  <FlatMate data={flatmate}/>
                </Col>
              )
            })
          }
        </Row>


        {/* Invite Modal */}
        <Modal isOpen={this.state.showModal} toggle={this.toggleInvite}>
          <ModalHeader toggle={this.toggleInvite}>Invite a new flatmate using:</ModalHeader>

          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'qr' })}
                  onClick={() => { this.toggle('qr'); }} >
                  QR Code
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'email' })}
                  onClick={() => { this.toggle('email'); }}
                >
                  Email
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'text' })}
                  onClick={() => { this.toggle('text'); }}
                >
                  Text
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="qr">
                <Row>
                  <Col md="12">
                    <p className="center">Scan the QR code</p>
                    {/* Need to pipe in the flat id and point to flatmate.com/register/flat_id */}
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <QRCode className="qr centerQr" size="200" value={this.flatId} />
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId="email">
                <Row>
                  <Col md="12">
                    <p className="center">Enter an email associated with a flatmate account</p>
                    {/* Need to pipe in the flat id and point to flatmate.com/register/flat_id */}
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <InputGroup>
                        <Input placeholder="Enter email here" type="email"/>
                        <InputGroupAddon addonType="append"><Button color="primary">Send Invite</Button></InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId="text">
                <Row>
                  <Col md="12">
                    <p className="center">Enter a phone number associated with a flatmate account</p>
                    {/* Need to pipe in the flat id and point to flatmate.com/register/flat_id */}
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <InputGroup>
                      <Input placeholder="Enter phone number here" type="number"/>
                      <InputGroupAddon addonType="append"><Button color="primary">Send Invite</Button></InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.toggleInvite}>Done</Button>
          </ModalFooter>
        </Modal>


      </div>
    );
  }

}

export default FlatMates;
