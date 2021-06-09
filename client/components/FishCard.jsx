import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

class FishCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className = "fishCard" id= {this.props.key}>
          <ul>
            <li>Species Name: {this.props.speciesName}</li>
            <li>Species:</li>
          </ul>
        </div>
    );
  }
}

export default FishCard;
