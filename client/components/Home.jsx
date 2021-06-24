import React, { Component } from "react";
import ReactDOM from "react-dom";
import FishCard from "./FishCard.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      show: false,
      id: null,
      favorite: {},
    };
    /*     this.showModal = this.showModal.bind(this); */
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    // this.handleFavorite = this.handleFavoriteClick.bind(this);
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

  handleFavorite = (id, species) => {
    let method = "POST";
    if (!this.state.favorite[id]) {
      this.setState({
        favorite: { [id]: species },
      });
    }
    // console.log(this.state.favorite);
    fetch("/fish/postFish", {
      method: method,
      body: JSON.stringify(this.state.favorite),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        console.log(jsonRes);
        return jsonRes;
      })
      .catch((error) => {
        console.error(error)
      });
  };

  handleClick = (id) => {
    this.setState({ show: true, id: id });
    console.log(this.state.show);
    console.log(this.state.id);
  };

  handleCloseClick = () => {
    this.setState({ show: false });
    console.log(this.state.show);
    console.log(this.state.id);
  };

  /*   showModal = () => {
    this.setState({ show: true });
    console.log("clicked");
  }; */

  render() {
    return (
      <div>
        <h1 id="header">Sea Explorer</h1>
        {this.state.items.map((fish, i) => (
          <FishCard
            key={i}
            keyId={i}
            speciesName={fish["Species Name"]}
            speciesPicture={fish["Species Illustration Photo"]}
            fishingRegion={fish["NOAA Fisheries Region"]}
            fishingRate={fish["Fishing Rate"]}
            stateofFish={fish["Quote"]}
            show={this.state.show}
            handleClick={this.handleClick}
            handleCloseClick={(id) => {
              this.handleCloseClick(id);
            }}
            handleFavoriteClick={this.handleFavorite}
          />
        ))}
      </div>
    );
  }
}

export default Home;
