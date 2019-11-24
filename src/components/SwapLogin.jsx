import React, { Component } from "react";
import Login from "./Forms/Login";
import Profile from "./Profile/Profile";
import FollowList from "./FollowerList";
import axios from "axios";
import Signup from "./Forms/Signup";

// controls switches between login/signup/profile components
class SwapLogin extends Component {
  state = {
    loginOrProfile: this.props.loginOrProfile,

    username: "",

    email: "",
    tweets: []
  };

  // triggers when the user logged on successfully
  swicthComponents = (name, inEmail) => {
    this.getUserTweets(inEmail);
    this.setState({ email: inEmail });
    this.setState({ username: name });
    this.props.getUserFollowed(inEmail, "SELF");
    this.props.getUserFollowers(inEmail, "SELF");
    this.props.timelineMethod(inEmail);
    this.props.setEmailFunc(inEmail);
    this.props.setLoginState("PROFILE");
  };

  // get user's tweetss
  getUserTweets = email => {
    axios
      .get(
        "https://comp3207zehaofunc.azurewebsites.net/api/GetTweet?code=MHLftzWyCYWCevya5mc1o8DfWMHwmjx4TrVWiPJVUktj4VFIQNWCIA==&email=" +
          email
      )
      .then(res => {
        this.setState({ tweets: res.data });
      })
      .catch(res => {
        alert(res);
      });
  };

  //
  bringSignupPage = () => {
    this.props.setLoginState("SIGNUP");
  };

  bringLoginPage = () => {
    this.props.setLoginState("LOGIN");
  };

  render() {
    if (this.props.loginOrProfile === "LOGIN") {
      return (
        <div>
          <Login
            parentMethod={this.swicthComponents}
            bringSignupPage={this.bringSignupPage}
          />
        </div>
      );
    } else if (this.props.loginOrProfile === "PROFILE") {
      return (
        <div>
          <Profile
            followBtn={false}
            name={this.state.username}
            tweets={this.state.tweets}
            searchMethod={this.props.searchMethod}
          />
          <FollowList
            searchMethod={this.props.searchMethod}
            getUserTweets={this.getUserTweets}
            email={this.state.email}
            followers={this.props.followers}
            followed={this.props.followed}
          />
        </div>
      );
    } else if (this.props.loginOrProfile === "SIGNUP") {
      return <Signup bringLoginPage={this.bringLoginPage} />;
    }
  }
}

export default SwapLogin;
