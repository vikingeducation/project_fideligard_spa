import React, { Component } from "react";
import Dropdown from "../components/Dropdown";
import Transaction from "../components/Transaction/Transaction";

class TransactionContainer extends Component {
  render() {
    return (
      <div className="container-fluid transactions stockElement bordered">
        <div className="row">
          <div className="col-8">
            <h4>Transactions</h4>
          </div>
          <div className="col-4">
            <Dropdown />
          </div>
        </div>
        <div className="row tableScroll">
          <Transaction />
        </div>
      </div>
    );
  }
}

export default TransactionContainer;
