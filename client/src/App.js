import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Nav, Nav2 } from "./components/Nav";
import Foot from "./components/Footer";
import Home from "./pages/Home";
import Second from "./pages/Second";
import Third from "./pages/Third";
import Fourth from "./pages/Fourth";
import { Redirect } from "react-router";


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
              <main>{ this.state.loggedIn ?
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/LocalFavorites" component={Second} />
                  <Route exact path="/Meetups" component={Third} />
                  <Route exact path="/Itinerary" component={Fourth} />
                    <Redirect from='*' to='/Itinerary' />
                </Switch> 
                : 
                <Switch>
                  <Route exaxt path="/" component={Home} />
                  <Redirect  from="*" to='/'/>

                </Switch>
              }
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
