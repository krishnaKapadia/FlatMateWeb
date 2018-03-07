import React, { Component } from 'react';

class GroceryList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      groceries: [],
      size: 0
    }
  }

  render() {
    return (
        <div>
            Grocery List
        </div>
    );
  }

}

export default GroceryList;
