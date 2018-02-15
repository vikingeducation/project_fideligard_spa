import React from "react";
import Dropdown from "../components/Dropdown";
import Portfolio from "../components/Portfolio/Portfolio";
import { connect } from "react-redux";

const PortfolioContainer = ({ transactions, stocks }) => {
  let latestDate = Object.keys(stocks)
    .filter(a => {
      //if not null
      if (stocks[a]) {
        return true;
      }
      return false;
    })
    //sort descending
    .sort((a, b) => {
      return new Date(b) - new Date(a);
    });
  latestDate = latestDate[0];
  let latestStocks = stocks[latestDate];

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
          transactions[i].quantity * transactions[i].price -
            transactions[i].quantity * latestStocks[transactions[i].symbol] -
            transactions[i].price
        );
        portfolioHeadingCalc.currentValue += Number(
          transactions[i].quantity * transactions[i].price
        );
        portfolioHeadingCalc.profit += Number(
          transactions[i].quantity * transactions[i].price -
            transactions[i].quantity * latestStocks[transactions[i].symbol]
        );
      } else {
        portfolioHeadingCalc.costBasis -= Number(
          transactions[i].quantity * transactions[i].price -
            transactions[i].quantity * latestStocks[transactions[i].symbol] -
            transactions[i].price
        );
        portfolioHeadingCalc.currentValue -= Number(
          transactions[i].quantity * transactions[i].price
        );
        portfolioHeadingCalc.profit -= Number(
          transactions[i].quantity * transactions[i].price -
            transactions[i].quantity * latestStocks[transactions[i].symbol]
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${portfolioHeadingCalc.costBasis.toFixed(2)}</td>

              <td>${portfolioHeadingCalc.currentValue.toFixed(2)}</td>

              <td>${portfolioHeadingCalc.profit.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row portfolioStocks">
        <Portfolio latestStocks={latestStocks} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    stocks: state.stocks
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

export default connect(mapStateToProps)(PortfolioContainer);
