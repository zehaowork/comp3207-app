import React, { Component } from "react";
import axios from "axios";
import "./Forms.css";

// signup form
class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    surname: "",
    status: "text-warning",
    statusText: ""
  };
  validateEmail = mail => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      return true;
    }

    return false;
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleRepeatPasswordChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };
  handleFirstNameChange = event => {
    this.setState({ firstname: event.target.value });
  };
  handleSurNameChange = event => {
    this.setState({ surname: event.target.value });
  };

  // send requst to sign up an account
  signup = () => {
    if (
      this.state.confirmPassword.length === 0 ||
      this.state.email.length === 0 ||
      this.state.firstname.length === 0 ||
      this.state.surname.length === 0 ||
      this.state.password.length === 0 ||
      0
    ) {
      this.setState({
        statusText: "Status: Please fill in all field.",
        status: "text-warning"
      });
    } else if (!this.validateEmail(this.state.email)) {
      this.setState({
        statusText: "Status: Please enter valid email address.",
        status: "text-warning"
      });
    } else {
      if (this.state.password === this.state.confirmPassword) {
        axios
          .get(
            "https://comp3207zehaofunc.azurewebsites.net/api/AddUser?code=cZh74LXoBYWVvzoYrdSIGL3JmDJvFku3nxqejPw1w9zinwStS5I/7A==&email=" +
              this.state.email.toLowerCase() +
              "&password=" +
              this.state.password +
              "&firstname=" +
              this.state.firstname +
              "&surname=" +
              this.state.surname
          )
          .then(res => {
            alert("You have Signed up!");
            this.props.bringLoginPage();
          })
          .catch(res => {
            alert(
              "An account with Email " + this.state.email + " already exists."
            );
            alert(res);
          });
      } else {
        this.setState({
          statusText: "Status: Password do not match.",
          status: "text-warning"
        });
      }
    }
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
              value={this.state.password}
              onChange={this.handlePasswordChange}
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pass">Repeat Password</label>
            <input
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleRepeatPasswordChange}
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pass">Firstname</label>
            <input
              type="text"
              value={this.state.firstname}
              onChange={this.handleFirstNameChange}
              className="form-control"
              id="firstname"
              placeholder="Your Firstname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pass">Surname</label>
            <input
              type="text"
              value={this.state.surname}
              onChange={this.handleSurNameChange}
              className="form-control"
              id="lastname"
              placeholder="Your Surname"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={this.signup}
              className="btn btn-primary btn-lg login_btn"
            >
              Sign up
            </button>
            <a className="signup" onClick={this.props.bringLoginPage} href="#">
              Login
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

export default Signup;
