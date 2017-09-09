import React, { Component } from "react";
import { connect } from "react-redux";
import { Stocks } from "../Components/Stocks";

import Input from "../Components/elements/Input";

//testing table
import Table from "../Components/elements/Table";
const columns = ["Symbol", "Price", "1d", "7d", "30d", "Trade?"];
const rows = [["AAPL", 100], ["thing", "stuff"]];

export default class StockContainer extends Component {
  constructor(props) {
    super(props);
  }
  //needs filtering
  //needs sorting

  render() {
    return (
      <div className="container-fluid">
        <div id="stock-controls" className="row">
          <div className="col-6">
            <p>Stocks</p>
          </div>
          <div className="col-6">
            <p>Filter</p>
            <Input />
          </div>
        </div>
        <div className="row">
          <Table rows={rows} columns={columns} />
        </div>
      </div>
    );
  }
}
//TODO: hook up redux
// const mapStateToProps = state => {
//   return {};
// };
// const mapDispatchToProps = dispatch => {
//   return {};
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(StockContainer);
