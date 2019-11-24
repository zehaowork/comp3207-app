import React, { Component } from "react";

// use display follower/following
class Relation extends Component {
  state = {};

  search = () => {
    this.props.searchMethod(this.props.email);
  };

  render() {
    return (
      <div className="Relation">
        <span className="userName">{this.props.name}</span>
        <a href="#" onClick={this.search} className="email">
          {this.props.email}
        </a>
      </div>
    );
  }
}

export default Relation;
