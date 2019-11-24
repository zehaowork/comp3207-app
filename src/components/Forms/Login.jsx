import React, { Component } from "react";

import "./Forms.css";
import axios from "axios";
// a single login form responsible for sending login request to the server
class Login extends Component {
  state = {
    email: "",
    password: "",
    status: "",
    statusText: ""
  };
  // send request to login
  login = () => {
    const inEmail = this.state.email.toLowerCase();
    const inPass = this.state.password;
    if (inEmail.length === 0 || inPass.length === 0) {
      this.setState({
        statusText: "Status: Please enter username and password.",
        status: "text-warning"
      });
    } else {
      axios
        .post(
          "https://comp3207zehaofunc.azurewebsites.net/api/Login?code=WzdsSzaYKr8mLr/6NdGuuUixttNRgoM9J8GpllW0lZHnK5Ysga6X7A==&email=" +
            inEmail +
            "&password=" +
            inPass
        )
        .then(res => {
          alert(res.data + " Welcome back!");
          this.props.parentMethod(res.data, inEmail);
        })
        .catch(error => {
          this.setState({
            statusText: "Status: Wrong password entered.",
            status: "text-warning"
          });
        });
    }
  };

  // store the input vaue to state of the component
  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="FormContainer">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              value={this.state.pass}
              onChange={this.handlePasswordChange}
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={this.login}
              className="btn btn-primary btn-lg login_btn"
            >
              Login
            </button>
            <a className="signup" onClick={this.props.bringSignupPage} href="#">
              Sign up
            </a>
          </div>
        </form>
        <h6 className={"Status " + this.state.status}>
          {this.state.statusText}
        </h6>
      </div>
    );
  }
}

export default Login;
