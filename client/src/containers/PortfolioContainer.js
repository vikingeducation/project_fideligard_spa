import React from "react";
import Dropdown from "../components/Dropdown";
import Portfolio from "../components/Portfolio/Portfolio";
import { connect } from "react-redux";
import { dateDifference } from "../helpers/helper";

const PortfolioContainer = ({ transactions }) => {
  let portfolioHeadingCalc = {
    costBasis: 0,
    currentValue: 0,
    profit: 0,
    oneDay: 0,
    weekDay: 0,
    monthDay: 0
  };
  if (transactions.length) {
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "BUY") {
        portfolioHeadingCalc.costBasis += Number(
          transactions[i].quantity * transactions[i].price[0] -
            transactions[i].quantity * transactions[i].price[3] -
            transactions[i].price[0]
        );
        portfolioHeadingCalc.currentValue += Number(
          transactions[i].quantity * transactions[i].price[0]
        );
        portfolioHeadingCalc.profit += Number(
          transactions[i].quantity * transactions[i].price[0] -
            transactions[i].quantity * transactions[i].price[3]
        );
        portfolioHeadingCalc.oneDay += Number(
          transactions[i].price[0] - transactions[i].price[1]
        );
        portfolioHeadingCalc.weekDay += Number(
          transactions[i].price[0] - transactions[i].price[2]
        );
        portfolioHeadingCalc.monthDay += Number(
          transactions[i].price[0] - transactions[i].price[3]
        );
      } else {
        portfolioHeadingCalc.costBasis -= Number(
          transactions[i].quantity * transactions[i].price[0] -
            transactions[i].quantity * transactions[i].price[3] -
            transactions[i].price[0]
        );
        portfolioHeadingCalc.currentValue -= Number(
          transactions[i].quantity * transactions[i].price[0]
        );
        portfolioHeadingCalc.profit -= Number(
          transactions[i].quantity * transactions[i].price[0] -
            transactions[i].quantity * transactions[i].price[3]
        );
        portfolioHeadingCalc.oneDay -= Number(
          transactions[i].price[0] - transactions[i].price[1]
        );
        portfolioHeadingCalc.weekDay -= Number(
          transactions[i].price[0] - transactions[i].price[2]
        );
        portfolioHeadingCalc.monthDay -= Number(
          transactions[i].price[0] - transactions[i].price[3]
        );
      }
    }
  }
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

              <th>
                {transactions[0]
                  ? dateDifference(transactions[0].date[1])
                  : "0"}d
              </th>

              <th>
                {transactions[0]
                  ? dateDifference(transactions[0].date[2])
                  : "0"}d
              </th>

              <th>
                {transactions[0]
                  ? dateDifference(transactions[0].date[3])
                  : "0"}d
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${portfolioHeadingCalc.costBasis.toFixed(2)}</td>

              <td>${portfolioHeadingCalc.currentValue.toFixed(2)}</td>

              <td>${portfolioHeadingCalc.profit.toFixed(2)}</td>

              <td>${portfolioHeadingCalc.oneDay.toFixed(2)}</td>

              <td>${portfolioHeadingCalc.weekDay.toFixed(2)}</td>

              <td>${portfolioHeadingCalc.monthDay.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row portfolioStocks">
        <Portfolio />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

export default connect(mapStateToProps)(PortfolioContainer);
