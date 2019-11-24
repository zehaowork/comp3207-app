import React, { Component } from "react";
import "./Profile.css";
import Tweet from "../Tweets/Tweet";
import FollowBtn from "../FollowBtn";

import ProfileImg from "../Tweets/ProfileImg";
// display a profile compnent with name and their tweets
class Profile extends Component {
  state = {};

  render() {
    return (
      <div className="profile">
        <div className="profileCard">
          <ProfileImg />
          <h1>{this.props.name}</h1>
          <FollowBtn
            targetEmail={this.props.targetEmail}
            followBtn={this.props.followBtn}
            followFunc={this.props.followFunc}
            followState={this.props.followState}
          />
        </div>

        <div className="userTweets">
          {this.props.tweets.map(tweet => (
            <Tweet
              email={tweet.PartitionKey}
              key={tweet.RowKey}
              name={this.props.name}
              time={tweet.RowKey}
              content={tweet.Content}
              searchMethod={this.props.searchMethod}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
