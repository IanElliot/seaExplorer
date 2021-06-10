import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Popup from "./Popup.jsx";

class FishCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.speciesPicture.src);
    let pictureExists = this.props.speciesPicture;
    return (
      <div className="fishCard">
        <ul>
          <img src={this.props.speciesPicture.src} alt="" />
          <li>
            <strong>Species Name:</strong> {this.props.speciesName}
          </li>
          <li>
            <strong>Fishing Region:</strong> {this.props.fishingRegion}
          </li>
          <li>Fishing Rate: {this.props.fishingRate}</li>
        </ul>
        <br></br>
        <button
          id="conditionButton"
          type="button"
          onClick={() => {
            this.props.handleClick(this.props.keyId);
          }}
        >
          Current Condition
        </button>
        {this.props.show ? (
          <Popup
            show={this.props.show}
            stateofFish={this.props.stateofFish}
            handleCloseClick={() => {
              this.props.handleCloseClick();
            }}
          />
        ) : null}
        <button
          id="favoriteButton"
          type="button"
          onClick={() => {
            this.props.handleFavoriteClick(
              this.props.keyId,
              this.props.speciesName
            );
          }}
        >
          Favorite
        </button>
      </div>
    );
  }
}

export default FishCard;
