import React, { Component } from "react";
import ReactDOM from "react-dom";

class Popup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <div>{this.props.stateofFish}</div>
          <button
            id="closeButton"
            onClick={() => {
              this.props.handleCloseClick();
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
