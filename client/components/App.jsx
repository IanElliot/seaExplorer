import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Nav from "./Nav.jsx";
import Favorites from "./Favorites.jsx"
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Nav />
        <Route path="/" component={Home}/>
        <Route path="/Favorites" component={Favorites}/>
      </div>
      </Router>
    );
  }
}

export default App;
