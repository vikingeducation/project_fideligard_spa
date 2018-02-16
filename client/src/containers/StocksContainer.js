import React, { Component } from "react";
import { connect } from "react-redux";
import Stock from "../components/Stock/Stock";
import StockHeader from "../components/Stock/StockHeader";
import { displayDate, apiDate, previousDate } from "../helpers/helper";
import { setSearch } from "../actions";
import { RingLoader } from "react-spinners";

class StocksContainer extends Component {
  render() {
    const { todaysDate, setSearchEnter, stocks, searchBox } = this.props;
    return (
      <span>
        <div className="stockElement bordered">
          <div className="row">
            <div className="col-6">
              <h2>Stocks</h2>
              <small>{displayDate(todaysDate)}</small>
            </div>
            <div className="col-6">
              <label htmlFor="filter">
                Filter{" "}
                <input
                  type="name"
                  id="filter"
                  onChange={e => setSearchEnter(e.target.value)}
                  value={searchBox.toUpperCase()}
                />
              </label>
            </div>
          </div>

          <div className="row tableScroll ">
            <table className="table ">
              <thead>
                <StockHeader todaysDate={this.props.todaysDate} />
              </thead>
              <tbody id="stocks">
                {Object.keys(stocks).length > 1 ? (
                  <Stock
                    todayStock={stocks[apiDate(todaysDate)]}
                    yesterStock={stocks[apiDate(previousDate(todaysDate, 1))]}
                    weekStock={stocks[apiDate(previousDate(todaysDate, 7))]}
                    monthStock={stocks[apiDate(previousDate(todaysDate, 30))]}
                    date={todaysDate}
                    searchBox={searchBox}
                  />
                ) : (
                  <tr>
                    <td />
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {Object.keys(stocks).length > 3 ? (
            ""
          ) : (
            <div className="row justify-content-center">
              <div className="col-3">
                <RingLoader />
              </div>
            </div>
          )}
        </div>
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks,
    searchBox: state.searchBox,
    todaysDate: state.todaysDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchEnter: inputSearch => {
      dispatch(setSearch(inputSearch));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
