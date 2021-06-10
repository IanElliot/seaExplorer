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
          <p>Hey!</p>
          {this.props}
          <button onClick={props.closeMe}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup;
