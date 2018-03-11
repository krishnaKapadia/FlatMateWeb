import React, { Component } from 'react';
import { Card, CardBody, Row, Col, Input, Media } from 'reactstrap';
import placeholder from './2.jpg';

class FlatMate extends Component {

  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            {/* Picture */}
            <Col>
              <img className="profileCardImg" src={placeholder} alt="Placeholder image"/>
            </Col>

            {/* Info */}
            <Col>
              {/* Name */}
              <Row>
                <p>Name: {this.props.data.fullName}</p>
              </Row>

              {/* Number of active chores */}
              <Row>
                <p>Active Chores: 2</p>
              </Row>
            </Col>
          </Row>

          <Row>
            {/* Star rating */}
            <Col>

            </Col>
          </Row>

        </CardBody>
      </Card>
    );
  }

}

export default FlatMate;
