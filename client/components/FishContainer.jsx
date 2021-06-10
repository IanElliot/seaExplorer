import React, { Component } from "react";
import ReactDOM from "react-dom";
import FishCard from "./FishCard.jsx";

class FishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    console.log(this.state.items);

    return (
      <div>
        <h1 id="header">Sea Explorer</h1>
        {this.state.items.map((fish, i) => (
          <FishCard
            key={i}
            speciesName={fish["Species Name"]}
            speciesPicture={fish["Species Illustration Photo"]}
            fishingRegion={fish["NOAA Fisheries Region"]}
            fishingRate={fish["Fishing Rate"]}
            stateofFish={fish["Quote"]}
            showModal={this.showModal}
            hideModal={this.hideModal}
            show={this.show}
          />
        ))}
      </div>
    );
  }
}

export default FishContainer;
