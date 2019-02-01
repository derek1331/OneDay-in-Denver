import React from "react";
import "./Modal.css";
import { Modal, Button } from "react-materialize";
import axios from "axios-jsonp-pro";
import { Redirect } from "react-router";

class LoginModal extends React.Component {
  state = {
    username: "",
    password: "",
    redirectTo: null,
    login: true
  };

  // focusInput = (component) => {
  //   if (component) {
  //     component.focus();
  //   }
  // };

  componentDidMount() {
    document.querySelector(".log").focus();
  }

  //handles signup
  handleSubmit = event => {
    event.preventDefault();
    //request to server here
    axios
      .post("/api/users", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        sessionStorage.setItem("user", this.state.username);
        if (response.data) {
          let overlay = document.querySelector(".modal-overlay");
          if (overlay) {
            overlay.remove();
            this.setState({
              redirectTo: "/LocalFavorites"
            });
          }

        } else {
          console.log("Sign-up error");
        }
      })
      .catch(error => {
        console.log("Sign up server error");
        console.log(error);
      });
  };

  //state for signup button
  handleSign = () => {
    this.setState({
      login: false
    });
  };

  //state for login button
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
          // this.props.updateUser({
          //   loggedIn: true,
          //   email: response.date.username
          // });
          let overlay = document.querySelector(".modal-overlay");
          if (overlay) {
            overlay.remove();
            this.setState({
              redirectTo: "/LocalFavorites"
            });
          }


        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  };

  handleChange = event => {
    console.log(event.target.name);

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />

    } else {
      const icon = this.state.login ? (
      <div>
        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              type="email"
              name="username"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleChange}
              className="log validate"
            />
            <span
              className="helper-text"
              data-error="Please enter your email address."
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <span
              className="helper-text"
              data-error="Please enter your password."
            />
          </div>
        </div>
        <div className="center">
          <Button onClick={this.handleLogin}>Log In</Button>
        </div>
      </div>
    ) : (
      <div>
        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              type="email"
              name="username"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleChange}
              className="validate"
            />
            <span
              className="helper-text"
              data-error="Please enter a valid email address."
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <span
              className="helper-text"
              data-error="Please enter a valid password."
            />
          </div>
        </div>
        <div className="center">
          <Button onClick={this.handleSubmit}>Sign Up</Button>
        </div>
      </div>
    );
    return (
      <Modal trigger={<Button>Sign Up | Login</Button>} id="signUpModal">
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
              {" "}
              Login
            </a>
          </div>
        </div>
      </Modal>
    );
  }
    }
    
}
export default LoginModal;
