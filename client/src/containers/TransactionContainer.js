import React from "react";
import Dropdown from "../components/Dropdown";
import { connect } from "react-redux";

const TransactionContainer = ({}) => {
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
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>

              <th>Symbol</th>

              <th>Type</th>

              <th>Quantity</th>

              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1/1/2014</td>

              <td>AAPL</td>

              <td>BUY</td>

              <td>100</td>

              <td>321.21</td>
            </tr>
            <tr>
              <td>1/1/2014</td>

              <td>AAPL</td>

              <td>SELL</td>

              <td>10</td>

              <td>32.12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

export default connect()(TransactionContainer);
