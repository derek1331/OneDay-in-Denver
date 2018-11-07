import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import TestModal from "../Modal";

// nav if logged in
class Nav extends React.Component {
  // rough logout--fix
  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="white" role="navigation">
          <div className="nav-wrapper container">
            <ul id="logo-container" href="#" className="brand-logo black-text">
              <NavLink
                exact
                to="/fourth"
                style={{ color: "#795548", fontWeight: "bold" }}
              >
                OneDay in Denver
              </NavLink>
            </ul>
            <ul className="right hide-on-med-and-down">
              <NavLink
                to="/"
                style={{ color: "#795548", fontWeight: "bold" }}
                onClick={this.logout}
              >
                Logout
              </NavLink>
            </ul>
            <ul className="right hide-on-med-and-down">
              <NavLink
                to="/Itinerary"
                style={{ color: "#795548", fontWeight: "bold" }}
                activeStyle={{
                  textDecoration: "underline #795548 solid"
                }}
              >
                Itinerary
              </NavLink>
            </ul>
            <ul className="right hide-on-med-and-down">
              <NavLink
                to="/Meetups"
                style={{ color: "#795548", fontWeight: "bold" }}
                activeStyle={{
                  textDecoration: "underline #795548 solid"
                }}
              >
                Meetups
              </NavLink>
            </ul>
            <ul className="right hide-on-med-and-down">
              <NavLink
                to="/LocalFavorites"
                style={{ color: "#795548", fontWeight: "bold" }}
                activeStyle={{
                  textDecoration: "underline #795548 solid"
                }}
              >
                Local Favorites
              </NavLink>
            </ul>

            <ul id="nav-mobile" className="sidenav">
              <li>
                <a href="#">Navbar Link</a>
              </li>
            </ul>
            <a href="#" data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

// nav if need to sign in
class Nav2 extends React.Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="white" role="navigation">
          <div className="nav-wrapper container">
            <ul id="logo-container" href="#" className="brand-logo black-text">
              <NavLink
                exact
                to="/"
                style={{ color: "#795548", fontWeight: "bold" }}
              >
                OneDay in Denver
              </NavLink>
            </ul>
            <div className="right hide-on-med-and-down">
              <TestModal />
            </div>
            <ul id="nav-mobile" className="sidenav">
              <li>
                <a href="#">Navbar Link</a>
              </li>
            </ul>
            <a href="#" data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export { Nav, Nav2 };
