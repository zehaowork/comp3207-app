import React, { Component } from "react";
// a button for prompt follow a user
class FollowBtn extends Component {
  state = {};

  render() {
    if (this.props.followBtn === true) {
      return (
        <button onClick={this.props.followFunc} className="btn btn-primary">
          {this.props.followState}
        </button>
      );
    } else {
      return <div></div>;
    }
  }
}

export default FollowBtn;
