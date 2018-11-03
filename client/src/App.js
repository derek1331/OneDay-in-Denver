import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Nav, Nav2 } from "./components/Nav";
import Foot from "./components/Footer";
import Home from "./pages/Home";
import Second from "./pages/Second";
import Third from "./pages/Third";
import Fourth from "./pages/Fourth";
import TestModal from "./components/Modal";
import Collapsed from "./components/Collapsible";
import Testing from "./pages/Testing";
import Map from "./pages/Map";

class App extends Component {
  state = {
    loggedIn: sessionStorage.getItem("user")
  };

  render() {
    return (
      <Router>
        <div className="App Site">
          <div className="Site-content">
            <div className="App-header">
              {this.state.loggedIn ? <Nav /> : <Nav2 />}
            </div>
            <div className="main">
              <main>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/second" component={Second} />
                  <Route exact path="/third" component={Third} />
                  <Route exact path="/fourth" component={Fourth} />
                  <Route exact path="/testing" component={Testing} />
                  <Route exact path="/map" component={Map} />
                </Switch>
              </main>
            </div>
          </div>
          <Foot />
        </div>
      </Router>
    );
  }
}
export default App;
