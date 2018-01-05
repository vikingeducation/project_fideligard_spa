import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import serialize from "form-serialize";

import FBdata from "../data/FBclose.json";
import GOOGLEdata from "../data/GOOGLEclose.json";

class StockContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      stocks: [Facebook, Google],
      stocksArray: []
    };
  }

  componentDidMount() {}

  showing(data) {
    JSON.parse(data);
  }

  render() {
    return (
      <div>
        <StockPanel />
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
