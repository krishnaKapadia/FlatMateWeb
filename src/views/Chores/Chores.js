import React, { Component } from 'react';
import {
  Row, Col, Card, CardHeader, CardBody, CardFooter, Button,
  Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import firebase, { getChores } from "../../utils/firebase/firebase";

class Chores extends Component {
  // TODO adding a new chore automatically updates the firebase db, not good!
  constructor(props) {
    super(props);
    this.state = {
      chores: [],
      size: 0,
      dropdownOpen: false,
      selectedFlatMate: '',
      newChoreTitle: ''
    }

    let flatId = '-L6otCkBCNUL6n0dcSz1';
    this.flat = firebase.database().ref(`Flats/${flatId}/Chores`);
    this.addChore = this.addChore.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    var choresObj = getChores('-L6otCkBCNUL6n0dcSz1');
    // this.flat.once('value', (snapshot) => {
    //
    //   snapshot.forEach((choreObj) => {
    //     chores.push({
    //       editable: false,
    //       chore: choreObj.val().chore,
    //       flatmate: choreObj.val().flatmate,
    //       time: ''
    //     });
    //     size++;
    //   });
    //
    console.log(choresObj);
      // this.setState({ chores: choresObj.chores, size: choresObj.size });
    // });

  }

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
      editable: true,
      chore: '',
      flatmate: {}
    }

    var chores = this.state.chores;
    chores.push(emptyChore);

    this.setState({ chores });
  }

  /**
  * Submits the new chore to firebase and then clears the fields
  */
  submitChore(chore) {
    // Create new chore obj
    // chore.flatmate = {
    //   fullName: this.state.selectedFlatMate
    // }
    // Submit
    // this.flat.push(chore);
    // Clear fields
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
                    <Button className="fullWidthButton" color="primary" onClick={this.addChore}>Add Chore</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

        </Row>

        <Row>
        {
          this.state.chores.map((chore) => {
            if(chore.editable) {
              return(
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
                          {/* <DropdownItem divider /> */}
                          <DropdownItem onClick={() => this.setState({ selectedFlatMate: 'Mia Khalifa' })}>Mia Khalifa</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </CardBody>
                    <CardFooter>
                      {/* Due in: { chore.time } */}
                      <Button color="primary" className="fullWidthButton" onClick={this.submitChore(chore)}>Save chore</Button>
                    </CardFooter>
                  </Card>
                </Col>
              )
            } else {
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
            }
          })

        }
        </Row>

      </div>
    );
  }

}

export default Chores;
