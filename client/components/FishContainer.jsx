import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

class FishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("/fish/getFish", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        this.setState({
          items: jsonRes,
        });
      });
  }

  render() {
    console.log(this.state.items);
    return (
      <div>
        <div></div>
        <h1 id="header">Sea Explorer</h1>
        <div id="fishBox">
          <div></div>
          <ul>
            <li>Species Name:</li>
            <li>Species:</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default FishContainer;
