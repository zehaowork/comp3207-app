import React, { Component } from "react";
import "./home.css";
import Relation from "./Relation";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import RichEditor from "./Forms/RichEditor";
// display a list of followers / following, includes a tab for tweet
class FollowerList extends Component {
  state = {
    email: this.props.email,
    status: " ",

    statusClassName: "text-success"
  };

  calculateLength = content => {
    var contentLength = 0;
    for (const c of content) {
      contentLength = contentLength + c.numChar;
    }
    console.log(contentLength);
    return contentLength;
  };

  sendTweet = content => {
    let inEmail = this.state.email.toLowerCase();

    var contentLength = this.calculateLength(content);

    if (contentLength === 0) {
      this.setState({ status: "Tweet cannot be empty." });
      this.setState({ statusClassName: "text-warning" });
    } else if (contentLength > 140) {
      this.setState({ status: "You have exceeded the 140 character limit." });
      this.setState({ content: "" });
      this.setState({ statusClassName: "text-warning" });
    } else {
      axios
        .post(
          "https://comp3207zehaofunc.azurewebsites.net/api/AddTweet?code=ZRz4FTsLSsrw4bkPmr17sHsDjx8haev4bsFXvHAqhwLMGHBEIdqv6w==&&email=" +
            inEmail +
            "&content=" +
            JSON.stringify(content)
        )
        .then(res => {
          this.setState({ status: res.data });
          this.setState({ content: "" });
          this.setState({ statusClassName: "text-success" });
          this.props.getUserTweets(inEmail);
        })
        .catch(res => {
          this.setState({ status: "Tweet failed to send" });
          this.setState({ content: "" });
          this.setState({ statusClassName: "text-danger" });
        });
    }
  };

  // reference : https://www.w3schools.com/howto/howto_js_tabs.asp

  // select between tabs
  selectTab = tabName => e => {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    e.currentTarget.className += " active";
  };

  render() {
    if (this.props.tweet === false) {
      return (
        <div>
          <div className="tab">
            <button className="tablinks" onClick={this.selectTab("Follower")}>
              Followers
            </button>
            <button className="tablinks" onClick={this.selectTab("Followed")}>
              Followed
            </button>
          </div>

          <div id="Follower" className="tabcontent relationList">
            {this.props.followers.map(follower => (
              <Relation
                searchMethod={this.props.searchMethod}
                key={follower.RowKey}
                name={follower.firstname + " " + follower.surname}
                email={follower.RowKey}
              />
            ))}
          </div>

          <div id="Followed" className="tabcontent relationList">
            {this.props.followed.map(followed => (
              <Relation
                searchMethod={this.props.searchMethod}
                key={followed.RowKey}
                name={followed.firstname + " " + followed.surname}
                email={followed.RowKey}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="tab">
            <button className="tablinks" onClick={this.selectTab("tFollower")}>
              Followers
            </button>
            <button className="tablinks" onClick={this.selectTab("tFollowed")}>
              Followed
            </button>
            <button className="tablinks" onClick={this.selectTab("Tweet")}>
              Tweet
            </button>
          </div>

          <div id="tFollower" className="tabcontent relationList">
            {this.props.followers.map(follower => (
              <Relation
                searchMethod={this.props.searchMethod}
                key={follower.RowKey}
                name={follower.firstname + " " + follower.surname}
                email={follower.RowKey}
              />
            ))}
          </div>

          <div id="tFollowed" className="tabcontent relationList">
            {this.props.followed.map(followed => (
              <Relation
                searchMethod={this.props.searchMethod}
                key={followed.RowKey}
                name={followed.firstname + " " + followed.surname}
                email={followed.RowKey}
              />
            ))}
          </div>

          <div id="Tweet" className="tabcontent">
            <RichEditor
              searchMethod={this.props.searchMethod}
              sendTweet={this.sendTweet}
              status={this.state.status}
              statusClassName={this.state.statusClassName}
            />
          </div>
        </div>
      );
    }
  }
}

export default FollowerList;
