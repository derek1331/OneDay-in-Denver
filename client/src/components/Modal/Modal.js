import React from "react";
import "./Modal.css";
import { Row, Input, Modal, Button, Icon } from "react-materialize";
import axios from "axios-jsonp-pro";
import { Redirect } from "react-router";

class TestModal extends React.Component {
  state = {
    username: "",
    password: "",
    redirectTo: null,
    login: true
  };

  // handles signup
  handleSubmit = event => {
    event.preventDefault();
    console.log("sign-up-form, email: ");
    console.log(this.state.username);
    //request to server here
    axios
      .post("/api/users", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        sessionStorage.setItem("user", this.state.username);
        console.log(response);
        if (response.data) {
          console.log("successful signup");
          window.location.reload();

          this.setState({
            redirectTo: "/LocalFavorites"
          });
        } else {
          console.log("Sign-up error");
        }
      })
      .catch(error => {
        console.log("Sign up server error");
        console.log(error);
      });
  };

  // sets state for signin
  handleSign = () => {
    this.setState({
      login: false
    });
  };

  // sets state for login
  handleLo = () => {
    this.setState({
      login: true
    });
  };

  // handles login
  handleLogin = event => {
    event.preventDefault();
    console.log("handleLogin");
    //request to server here
    axios
      .post("/api/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        sessionStorage.setItem("user", this.state.username);

        if (response.status === 200) {
          window.location.reload();

          this.setState({
            redirectTo: "/LocalFavorites"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  };

  // gets values from inputs
  handleChange = event => {
    console.log(event.target.name);

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    const icon = this.state.login ? (
      // login inputs
      <div>
        <div className="row">
          <div className="input-field">
            <i class="material-icons prefix">email</i>
            <input
              type="email"
              name="username"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <i class="material-icons prefix">lock</i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="center">
          <Button onClick={this.handleLogin}>Log In</Button>
        </div>
      </div>
    ) : (
      // signup
      <div>
        <div className="row">
          <div className="input-field">
            <i class="material-icons prefix">email</i>
            <input
              type="email"
              name="username"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <i class="material-icons prefix">lock</i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="center">
          <Button onClick={this.handleSubmit}>Sign Up</Button>
        </div>
      </div>
    );
    return (

      // modal
      <Modal trigger={<Button>Sign Up | Login</Button>}>
        <div className="modal-header center-align">
          <img src="https://image.ibb.co/cZsma0/logo.png" alt=" Mountains" />
        </div>
        <div className="modal-body">
          {icon}
          <div className="center" style={{ paddingTop: "10px" }}>
            <a
              style={{ color: "#795548", cursor: "pointer" }}
              onClick={this.handleSign}
            >
              {" "}
              Signup |
            </a>
            <a
              style={{ color: "#795548", cursor: "pointer" }}
              onClick={this.handleLo}
            >
              Login
            </a>
          </div>
        </div>
      </Modal>
    );
  }
}
export default TestModal;
