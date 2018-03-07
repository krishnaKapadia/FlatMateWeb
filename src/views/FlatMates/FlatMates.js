import React, { Component } from 'react';

class FlatMates extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flatmates: [],
      size: 0
    }
  }

  render() {
    return (
      <div>
        Flatmates
      </div>
    );
  }

}

export default FlatMates;
