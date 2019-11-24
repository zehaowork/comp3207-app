import React, { Component } from "react";
import "./Search.css";

// a search component, with search form
class Search extends Component {
  state = {
    query: ""
  };

  search = () => {
    this.props.searchMethod(this.state.query);
  };

  logOff = () => {
    this.props.logOff();
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };
  render() {
    if (this.props.selfEmail.length === 0) {
      return (
        <div className="searchDiv">
          <input
            placeholder="Enter User Email"
            className="form-group"
            value={this.state.query}
            onChange={this.handleChange}
            type="text"
          />

          <div className="col">
            <button
              type="button"
              onClick={this.search}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="searchDiv">
          <div className="col">
            <button onClick={this.logOff} className="btn btn-danger">
              Log Off
            </button>
          </div>

          <input
            className="form-group"
            placeholder="Enter User Email"
            value={this.state.query}
            onChange={this.handleChange}
            type="text"
          />

          <div className="col">
            <button
              type="button"
              onClick={this.search}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Search;
