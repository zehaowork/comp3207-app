import React, { Component } from "react";
import "./Forms.css";

// set of buttons for rich texts
class RichBtn extends Component {
  state = {};

  
  setBold = () => {
    this.props.setMode("B");
  };

  setItalic = () => {
    this.props.setMode("I");
  };
  setUnderline = () => {
    this.props.setMode("U");
  };
  setAt = () => {
    this.props.setMode("A");
  };

  setParagraph = () => {
    this.props.setMode("P");
  };

  render() {
    return (
      <div className="buttonSet">
        {" "}
        <button
          onClick={this.setBold}
          className="richTextBtn btn btn-dark btn-sm"
        >
          B
        </button>
        <button
          onClick={this.setItalic}
          className="richTextBtn btn btn-dark btn-sm"
        >
          <i>I</i>
        </button>
        <button
          onClick={this.setUnderline}
          className="richTextBtn btn btn-dark btn-sm"
        >
          <u>U</u>
        </button>
        <button
          onClick={this.setAt}
          className="richTextBtn btn btn-dark btn-sm"
        >
          @
        </button>
        <button
          onClick={this.setParagraph}
          className="richTextBtn btn btn-dark btn-sm"
        >
          <p>P</p>
        </button>
        <button
          onClick={this.props.pushText}
          className="richTextBtn-w btn btn-primary btn-sm"
        >
          <p>Push</p>
        </button>
        <button
          onClick={this.props.popText}
          className="richTextBtn-w btn btn-primary btn-sm"
        >
          <p>Pop</p>
        </button>
      </div>
    );
  }
}

export default RichBtn;
