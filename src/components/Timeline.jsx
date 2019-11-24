import React, { Component } from "react";
import Tweet from "./Tweets/Tweet";
class Timeline extends Component {
  state = {};
  render() {
    return (
      <div className="row Tweets">
        {this.props.timeline.map(tweet => (
          <Tweet
            searchMethod={this.props.searchMethod}
            key={tweet.RowKey}
            name={tweet.name}
            time={tweet.RowKey}
            email={tweet.PartitionKey}
            content={tweet.Content}
          />
        ))}
      </div>
    );
  }
}

export default Timeline;
