import React, { Component } from "react";

import Search from "./Search/Search";
import SwapLogin from "./SwapLogin";
import axios from "axios";
import Profile from "./Profile/Profile";
import Timeline from "./Timeline";
import "./home.css";
import FollowerList from "./FollowerList";

// compoenent that manages glbal states
class HomePage extends Component {
  state = {
    searchProfile: { firstname: "Search", surname: "User" },
    targetTweets: [],
    timeline: [],
    targetEmail: "",
    selfEmail: "",
    followState: "Follow",
    followed: [],
    searchFollowed: [],
    searchFollower: [],
    followers: [],
    loginOrProfile: "LOGIN"
  };

  // set when user logged on
  setLoginState = currentState => {
    this.setState({ loginOrProfile: currentState });
  };

  // get a particular user's follower with given email and indication of other or self
  getUserFollowers = (email, type) => {
    axios
      .get(
        "https://comp3207zehaofunc.azurewebsites.net/api/GetFollower?code=6Owq3u6WxnLYuMa5dUOCVObv1gHIHIJp4YpGwjqahFXxQAvRxWRIJA==&email=" +
          email
      )
      .then(res => {
        if (type === "SELF") {
          this.setState({ followers: res.data });
        } else {
          this.setState({ searchFollower: res.data });
        }
      })
      .catch(res => {
        alert(res);
      });
  };

  // reset all component states
  logOff = () => {
    this.setState({
      searchProfile: { firstname: "Search", surname: "User" },
      targetTweets: [],
      timeline: [],
      targetEmail: "",
      selfEmail: "",
      followState: "Follow",
      followed: [],
      searchFollowed: [],
      searchFollower: [],
      followers: [],
      loginOrProfile: "LOGIN"
    });
  };

  // check if the user is already followed by the owner
  isFollowed = (selfEmail, targetEmail) => {
    axios
      .get(
        "https://comp3207zehaofunc.azurewebsites.net/api/checkFollowed?code=01m4twUKd3rk9XAydyf0O8kistKheIXCFc8X9I/XvdKUfM/xyMrq2A==&selfEmail=" +
          selfEmail +
          "&targetEmail=" +
          targetEmail
      )
      .then(res => {
        this.setState({ followState: "Followed" });
        console.log(res.data);
      })
      .catch(res => {
        this.setState({ followState: "Follow" });
        console.log(res.data);
      });
  };

  // get all the user that user have followed
  getUserFollowed = (email, user) => {
    axios
      .get(
        "https://comp3207zehaofunc.azurewebsites.net/api/GetFollowed?code=hjrNJC9T99wxacNdM/cdomeVlLe99VkgcW/KL6IHfBNEU2oG9HHAbg==&email=" +
          email
      )
      .then(res => {
        if (user === "SELF") {
          this.setState({ followed: res.data });
        } else {
          this.setState({ searchFollowed: res.data });
        }
      })
      .catch(res => {
        alert(res);
      });
  };
  // follow a user
  followerUser = () => {
    if (
      this.state.targetEmail.length !== 0 &&
      this.state.selfEmail.length !== 0
    ) {
      axios
        .get(
          "https://comp3207zehaofunc.azurewebsites.net/api/Follow?code=1xCadMjYlCvcSF4RNPM4W6HsagTr7O47zLv0O1/QHcle4ro8joan7Q==&targetEmail=" +
            this.state.targetEmail +
            "&selfEmail=" +
            this.state.selfEmail
        )
        .then(res => {
          this.setState({ followState: "Followed" });
          this.getUserFollowed(this.state.selfEmail, "SELF");
          this.getUsersTimeline(this.state.selfEmail);
        })
        .catch(res => {
          alert("You have followed this user already");
        });
    } else if (this.state.selfEmail.length === 0) {
      alert("Please login before pressing follow.");
    } else {
      alert("Please search a valid user before pressing follow.");
    }
  };

  // get a particular user's timeline
  getUsersTimeline = email => {
    axios
      .get(
        "https://comp3207zehaofunc.azurewebsites.net/api/Timeline?code=N70vquqUM4/7mEyU0AwAEvtkBEsPqqvgDQdYTVXpXNxZS6Ct9btljQ==&email=" +
          email.toLowerCase()
      )
      .then(res => {
        this.setState({ timeline: res.data });
      })
      .catch(res => {
        alert(res);
      });
  };

  // search for a user, with email
  searchUser = email => {
    email = email.toLowerCase();
    axios
      .get(
        "https://comp3207zehaofunc.azurewebsites.net/api/Search?code=bnEB3v4AxEJIsfM950U1tkVocGJFXQa27o9pKYLgP3aXGAG2eyZAVA==&email=" +
          email.toLowerCase()
      )
      .then(res => {
        this.setState({ followState: "Follow" });
        this.setState({ searchProfile: res.data });
        this.setState({ targetEmail: email });
        this.getUserTweet(email);
        this.isFollowed(this.state.selfEmail.toLowerCase(), email);
        this.getUserFollowed(email, "SEARCH");
        this.getUserFollowers(email, "SEARCH");
      })
      .catch(res => {
        alert("User cannot be found.");
      });
  };
  // get user's tweets
  getUserTweet = email => {
    axios
      .get(
        "https://comp3207zehaofunc.azurewebsites.net/api/GetTweet?code=MHLftzWyCYWCevya5mc1o8DfWMHwmjx4TrVWiPJVUktj4VFIQNWCIA==&email=" +
          email
      )
      .then(res => {
        this.setState({ targetTweets: res.data });
      })
      .catch(res => {
        alert(res.data);
      });
  };

  // get the email address from the child state
  setSelfEmail = email => {
    this.setState({ selfEmail: email });
  };

  // check if the email state is empty
  ifSelfEmailEmpty = () => {
    if (this.state.selfEmail.length === 0) {
      return "LOGIN";
    }
    return null;
  };

  render() {
    return (
      <div className="row background">
        <div className="col">
          <SwapLogin
            followers={this.state.followers}
            getUserFollowers={this.getUserFollowers}
            searchMethod={this.searchUser}
            setEmailFunc={this.setSelfEmail}
            loginOrProfile={this.state.loginOrProfile}
            timelineMethod={this.getUsersTimeline}
            getUserFollowed={this.getUserFollowed}
            followed={this.state.followed}
            setLoginState={this.setLoginState}
          />
        </div>
        <div className="col">
          <Search
            logOff={this.logOff}
            selfEmail={this.state.selfEmail}
            searchMethod={this.searchUser}
          />
          <Timeline
            searchMethod={this.searchUser}
            timeline={this.state.timeline}
          />
        </div>
        <div className="col">
          <Profile
            searchMethod={this.searchUser}
            tweets={this.state.targetTweets}
            name={
              this.state.searchProfile.firstname +
              " " +
              this.state.searchProfile.surname
            }
            followBtn={true}
            followFunc={this.followerUser}
            followState={this.state.followState}
          />
          <FollowerList
            searchMethod={this.searchUser}
            email={this.state.targetEmail}
            followers={this.state.searchFollower}
            followed={this.state.searchFollowed}
            tweet={false}
          />
        </div>
      </div>
    );
  }
}

export default HomePage;
