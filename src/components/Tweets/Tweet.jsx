import React, { Component } from "react";
import ProfileImg from "./ProfileImg";
import Info from "./Info";

import Richtext from "../Forms/Richtext";
import "./styles.css";
// display a single instance of tweet with user's name random profile image and time submitted
class Tweet extends Component {
  state = {};

  render() {
    return (
      <div className="tweet">
        <ProfileImg />
        <div>
          <Info
            searchMethod={this.props.searchMethod}
            email={this.props.email}
            name={this.props.name}
            time={this.props.time}
          />
          <Richtext
            searchMethod={this.props.searchMethod}
            edit={false}
            resultString={JSON.parse(this.props.content)}
          />
        </div>
      </div>
    );
  }
}

export default Tweet;
