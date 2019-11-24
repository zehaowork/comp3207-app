import React, { Component } from "react";
class ProfileImg extends Component {
  state = {
    profileImg: "https://picsum.photos/300/300"
  };
  render() {
    return <img className="profileImg" src={this.state.profileImg} alt="" />;
  }
}

export default ProfileImg;
