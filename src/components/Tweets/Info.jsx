import React, { Component } from "react";
class Info extends Component {
  state = {
    name: this.props.name
  };

  render() {
    return (
      <div>
        <a
          href="#"
          onClick={() => this.props.searchMethod(this.props.email)}
          className="userName"
        >
          <u>{this.props.name}</u>
        </a>
        <span className="Time">@ {this.props.time}</span>
      </div>
    );
  }
}

export default Info;
