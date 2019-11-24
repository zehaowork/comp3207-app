import React, { Component } from "react";
import RichBtn from "./RichBtn";
import { Picker } from "emoji-mart";
import Richtext from "./Richtext";

// text editor for richtext where set of text is a json object
class RichEditor extends Component {
  state = {
    content: "",

    resultString: [],
    mode: "P"
  };

  // sends the tweet, set mode back to nromal text
  tweet = () => {
    this.setState({ mode: "P" });
    this.props.sendTweet(this.state.resultString);
  };

  // add emoji to the text
  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      content: this.state.content + emoji
    });
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  setMode = mode => {
    this.setState({ mode: mode });
  };

  // push text to the richtext displayer
  pushText = () => {
    var obj = {
      key: this.state.resultString.length + 1,
      mode: this.state.mode,
      content: this.state.content,
      numChar: this.state.content.length
    };
    var temp = this.state.resultString;
    temp.push(obj);
    this.setState({
      resultString: temp,
      content: ""
    });
    console.log(this.state.resultString);
  };

  popText = () => {
    var temp = this.state.resultString;
    temp.pop();

    this.setState({ resultString: temp });
    console.log(this.state.resultString);
  };

  render() {
    return (
      <div>
        <Richtext
          searchMethod={this.props.searchMethod}
          edit={true}
          resultString={this.state.resultString}
        />
        <RichBtn
          setMode={this.setMode}
          pushText={this.pushText}
          popText={this.popText}
        />
        <textarea
          className="tweetInput"
          value={this.state.content}
          name="comments"
          id="comments"
          onChange={this.handleChange}
        ></textarea>
        <span>
          <Picker set="emojione" native={true} onClick={this.addEmoji} />
        </span>
        <div>
          <div className="editorSet">
            <button onClick={this.tweet} className="btn btn-primary">
              Send
            </button>
            <p className={this.props.statusClassName}>
              Status: {this.props.status}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RichEditor;
