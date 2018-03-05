import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter
} from 'reactstrap';
import firebase from "../../utils/firebase/firebase";

class Chores extends Component {

  constructor(props) {
      super(props);
      this.state = {
          chores: [{
              chore: "Do the dishes",
              flatmate: {
                  fullName: "Harrison Bacordo"
              }
          }]
      }
  }

  componentDidMount() {
      // TODO: Firebase connection here
      var flat_ref = firebase.database().ref("L5BVw8lbVKhSVWPP0tX");

      flat_ref.on('value', (snapshot) => {
          console.log(snapshot.val());
      });

  }

  render() {
    var total_num = 0;
    return (
      <div>
        <Row>
        {
            this.state.chores.map((chore) => {
                total_num++;
                return(
                    <Col key={total_num} xs="12" md="3">
                        <Card>
                            <CardHeader>
                                {/* TODO: change to chore title on backend */}
                                {chore.chore}
                            </CardHeader>
                            <CardBody>
                                {chore.flatmate.fullName}
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        }
        </Row>

      </div>
    );
  }

}

export default Chores;
