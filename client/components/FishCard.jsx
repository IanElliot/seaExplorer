import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

class FishCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    console.log("Click happened");
  }

  render() {
    console.log(this.props.speciesPicture.src);
    let pictureExists = this.props.speciesPicture;

    return (
      <div className="fishCard">
        <ul>
          <img src={this.props.speciesPicture.src} alt="" />
          <li>Species Name: {this.props.speciesName}</li>
          <li>Fishing Region: {this.props.fishingRegion}</li>
          <li>Fishing Rate: {this.props.fishingRate}</li>
        </ul>
        <br></br>
        <button id="conditionButton" type="button" onClick={this.showModal}>
          Current Condition
        </button>
        <button id="favoriteButton" type="button" onClick={this.handleClick}>
          Favorite
        </button>
      </div>
    );
  }
}

export default FishCard;
