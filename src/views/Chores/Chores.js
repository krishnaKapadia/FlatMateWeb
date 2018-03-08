import React, { Component } from 'react';
import {
  Row, Col, Card, CardHeader, CardBody, CardFooter, Button,
  Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import firebase, { getChores } from "../../utils/firebase/firebase";

class Chores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chores: [],
      size: 0,
      dropdownOpen: false,
      addMode: false,
      selectedFlatMate: '',
      newChoreTitle: ''
    }

    this.flatId = '-L6otCkBCNUL6n0dcSz1';
    this.flat = firebase.database().ref(`Flats/${this.flatId}/Chores`);
    this.addChore = this.addChore.bind(this);
    this.setChoreTitle = this.setChoreTitle.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    var chores = [];
    var size = 0;
    // TODO Calendar http://intljusticemission.github.io/react-big-calendar/examples/index.html#intro
    getChores(this.flatId).then((choresObj) => {
      this.setState({ chores: choresObj.chores, size: choresObj.size });
    }).catch((err) => {
      console.log(`Error ${err}`);
    });
  }

  /**
  * Sets the title of the new chore
  */
  setChoreTitle(e) {
    this.setState({ newChoreTitle: e.target.value });
  }

  /**
  * Toggles the flatmate select dropdown
  */
  toggle() {
    this.setState( { dropdownOpen: !this.state.dropdownOpen });
  }

  /**
  * Adds a new editable chore to the chore list
  */
  addChore() {
    const emptyChore = {
      chore: '',
      flatmate: {}
    }

    var chores = this.state.chores;

    this.setState({ chores, size: this.state.size + 1, addMode: true });
  }

  /**
  * Submits the new chore to firebase and then clears the fields
  */
  submitChore() {
    this.setState({ addMode: false });

    // Create new chore obj
    let chore = {
      flatmate:{
          fullName: this.state.selectedFlatMate
      },
      chore: this.state.newChoreTitle
    }

    // Submit
    var chores = this.state.chores;
    chores.push(chore);

    this.setState({ chores, selectedFlatMate: '', newChoreTitle: '' });
    this.flat.child(chore.chore).update(chore);
    // Clear fields
    this.toggle();
  }

  render() {
    var total_num = 0;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={{ size: 12 }} md={{ size: 4 }} lg={{ size: 4 }}>

            <Card>
              <CardBody>
                <h3><i className="icon-event blue paddingRight" /> Chores: {this.state.size}</h3>
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
                    {
                      !this.state.addMode && <Button className="fullWidthButton animated fadeIn" color="primary" onClick={() => this.addChore()}>Add Chore</Button>
                    }
                    {
                      this.state.addMode && <Button className="fullWidthButton animated fadeIn" disabled color="primary" onClick={() => this.addChore()}>Add Chore</Button>
                    }
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

        </Row>

        <Row>

        {
          // First render all remaining chores and then render the new chore
          this.state.chores.map((chore) => {
            total_num++;
            return(
              <Col className="animated fadeIn" key={total_num} xs="12" md="3">
                <Card>
                  <CardHeader>
                    { chore.flatmate.fullName }
                  </CardHeader>
                  <CardBody>
                    {/* TODO: change to chore title on backend */}
                    { chore.chore }
                  </CardBody>
                  <CardFooter>
                    Due in: { chore.time }
                  </CardFooter>
                </Card>
              </Col>
            )
          })
        }

        {
          // Render the new add chore
          this.state.addMode &&
            <Col className="animated fadeIn" key={total_num} xs="12" md="3">
              <Card>
                <CardHeader>
                  <Input name="chore" placeholder="Chore Title" onChange={this.setChoreTitle} />
                </CardHeader>
                <CardBody>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                      { this.state.selectedFlatMate !== '' && this.state.selectedFlatMate }
                      { this.state.selectedFlatMate === '' && <p>Select flat mate</p> }
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => this.setState({ selectedFlatMate: 'Harrison Bacordo' })}>Harrison Bacordo</DropdownItem>
                      <DropdownItem onClick={() => this.setState({ selectedFlatMate: 'Krishna Kapadia' })}>Krishna Kapadia</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardBody>
                <CardFooter>
                  {/* Due in: { chore.time } */}
                  <Button color="primary" className="fullWidthButton" onClick={() => this.submitChore()}>Save chore</Button>
                </CardFooter>
              </Card>
            </Col>
        }
        </Row>

      </div>
    );
  }

}

export default Chores;
