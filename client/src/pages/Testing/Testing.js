import React, { Component } from "react";
import axios from "axios-jsonp-pro";
import {Redirect} from "react-router"

class Testing extends Component {
  state = {
    username: "",
    password: "",
    redirectTo: null
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("sign-up-form, email: ");
    console.log(this.state.username);
    //request to server here
    axios
      .post("http://localhost:5000/api/users", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (response.data) {
          console.log("successful signup");
          this.setState({
            redirectTo: "/second"
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
  handleLogin = event => {
    event.preventDefault();
    console.log('handleLogin');
    //request to server here
    axios
      .post("http://localhost:5000/api/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // this.props.updateUser({
          //   loggedIn: true,
          //   email: response.date.username
          // });
          this.setState({
            redirectTo: "/"
          });
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
  }
    return (
      <div>
        <div>
          <p>Sign In</p>
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <button onClick={this.handleLogin}>Sign In</button>
        </div>
        <br />
        <br />
        <div>
          <p>Sign Up</p>
          <input
            type="email"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <button onClick={this.handleSubmit}>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default Testing;
