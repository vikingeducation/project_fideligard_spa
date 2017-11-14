import React from "react";
import Dropdown from "../components/Dropdown";
import { connect } from "react-redux";

const PortfolioContainer = ({ portfolio }) => {
  return (
    <div className="container portfolio bordered">
      <div className="row">
        <div className="col-8">
          <h4>Portfolio</h4>
        </div>
        <div className="col-4">
          <Dropdown />
        </div>
      </div>
      <div className="row portfolioTotal">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Cost Basis</th>

              <th>Current Value</th>

              <th>Profit/Loss</th>

              <th>1d</th>

              <th>7d</th>

              <th>30d</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row portfolioStocks">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Symbol</th>

              <th>Quantity</th>

              <th>Cost Basis</th>

              <th>Current Value</th>

              <th>Profit/Loss</th>

              <th>Current Price</th>

              <th>1d</th>

              <th>7d</th>

              <th>30d</th>

              <th>trade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>
            </tr>
            <tr>
              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>

              <td>total</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

export default connect(mapStateToProps)(PortfolioContainer);
