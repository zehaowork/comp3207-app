import React, { Component } from "react";

class Content extends Component {
  state = {
    content: this.props.content
  };
  render() {
    return <p className="Content">{this.state.content}</p>;
  }
}

export default Content;
