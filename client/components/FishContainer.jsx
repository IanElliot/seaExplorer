import React, { Component } from "react";
import ReactDOM from "react-dom";
import FishCard from "./FishCard.jsx";

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
          isLoaded: true,
        });
      });
  }

  render() {
    console.log(this.state.items);
    return (
      <div>
        <h1 id="header">Sea Explorer</h1>
        {this.state.items.map((fish, i) => (
          <FishCard key={i} speciesName={fish.speciesName} />
        ))}
      </div>
    );
  }
}

export default FishContainer;
