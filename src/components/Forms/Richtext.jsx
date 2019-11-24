import React, { Component } from "react";

// a rich text renders that convert json data into html tags
class Richtext extends Component {
  state = {};

  render() {
    var elements = [];
    for (const r of this.props.resultString) {
      switch (r.mode) {
        case "B":
          elements.push(<b key={r.key}>{r.content}</b>);
          break;
        case "I":
          elements.push(<i key={r.key}>{r.content}</i>);
          break;
        case "U":
          elements.push(<u key={r.key}>{r.content}</u>);
          break;
        case "A":
          elements.push(
            <a
              href="#"
              onClick={() => this.props.searchMethod(r.content.toLowerCase())}
              key={r.key}
            >
              {r.content}
            </a>
          );
          break;
        case "P":
          elements.push(<span key={r.key}>{r.content}</span>);
          break;
        default:
          elements.push(<span key={r.key}>{r.content}</span>);
      }
    }

    if (this.props.edit === true) {
      return <p className="canvas tweetInput"> {elements}</p>;
    } else {
      return <p className="Content"> {elements} </p>;
    }
  }
}

export default Richtext;
