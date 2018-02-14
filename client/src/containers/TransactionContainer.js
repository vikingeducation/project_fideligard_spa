import React, { Component } from "react";
import Dropdown from "../components/Dropdown";
import Transaction from "../components/Transaction/Transaction";
import { connect } from "react-redux";

class TransactionContainer extends Component {
  render() {
    return (
      <div className="container transactions bordered">
        <div className="row">
          <div className="col-8">
            <h4>Transactions</h4>
          </div>
          <div className="col-4">
            <Dropdown />
          </div>
        </div>
        <div className="row">
          <Transaction />
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     transactions: state.transactions
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

export default connect()(TransactionContainer);
