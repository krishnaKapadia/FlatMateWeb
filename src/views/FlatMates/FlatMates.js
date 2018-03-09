import React, { Component } from 'react';
import { getFlatMates } from '../../utils/firebase/firebase';
import FlatMate from './FlatMate';

class FlatMates extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flatmates: [],
      size: 0
    }

    this.flatId = '-L6otCkBCNUL6n0dcSz1';
  }

  componentDidMount() {
    // Get flatmates
    getFlatMates(this.flatId).then((res) => {
      this.setState({ flatmates });
    });
  }

  render() {
    return (
      <div>
        {
          this.state.flatmates.map((flatmate) => {
            <Flatmate data={flatmate} />
          })
        }
      </div>
    );
  }

}

export default FlatMates;
