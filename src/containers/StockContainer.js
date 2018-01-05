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
      stocks: ["Facebook", "Google"],
      stocksArray: []
    };
  }

  componentDidMount() {
    let dataArray = JSON.parse(FBdata);
    console.log(dataArray);
    this.state.stocksArray.push(dataArray);
  }

  // showing(data) {
  //
  // }

  render() {
    return (
      <div>
        <StockPanel dataArray={this.state.stocksArray} />
      </div>
    );
  }
}

export default StockContainer;

//   componentDidMount() {
//     this.props._getInitialData();
//   }
// }
//
// const mapDispatchToProps = () => {
//   _getInitialData: () => dispatch(getInitialData())
// }
//
// export default connect(mapDispatchToProps, {})(StocksPresentional);
