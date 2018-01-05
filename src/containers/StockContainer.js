import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import serialize from "form-serialize";
import StockPanel from "../components/StockPanel";
import FBdata from "../data/FBclose.json";
import GOOGLEdata from "../data/GOOGLEclose.json";

class StockContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      stocks: ["FB", "GOOGL"],
      stocksArray: [FBdata.datatable.data, GOOGLEdata.datatable.data]
    };
  }

  componentDidMount() {
    // this.setState({
    //   stocksArray: this.state.stocksArray.push(
    //     FBdata.datatable.data,
    //     GOOGLEdata.datatable.data
    //   )
    // });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <StockPanel data={this.state} />
      </div>
    );
  }
}

export default StockContainer;
