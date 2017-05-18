import React, { Component } from "react";

class Filter extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    let searchTerm = e.target.value;
    console.log(this.state);
    this.setState({
      searchTerm
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onChange}
          placeholder="Filter stocks"
        />
      </div>
    );
  }
}

export default Filter;
