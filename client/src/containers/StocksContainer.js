import React from "react";
import { connect } from "react-redux";
import Stock from "../components/Stock/Stock";
import StockHeader from "../components/Stock/StockHeader";
import { sanitizeStocks, displayDate } from "../helpers/helper";
import { setSearch } from "../actions";

const StocksContainer = ({
  isFetching,
  monthStocks,
  weekStocks,
  yesterStocks,
  todayStocks,
  searchBox,
  setSearchEnter,
  todaysDate
}) => {
  let stockRows;
  let combinedStocksFiltered = [];
  let combinedStocks = [];
  if (
    todayStocks.data &&
    monthStocks.data &&
    weekStocks.data &&
    yesterStocks.data
  ) {
    combinedStocks = sanitizeStocks(
      todayStocks.data,
      monthStocks.data,
      weekStocks.data,
      yesterStocks.data
    );
    combinedStocksFiltered = combinedStocks;
    if (searchBox.length) {
      combinedStocksFiltered = combinedStocks.filter(item => {
        return item[0][0].includes(searchBox.toUpperCase());
      });
    }

    stockRows = combinedStocksFiltered.map((tStock, index) => (
      <Stock
        todayStock={combinedStocksFiltered[index][0]}
        yesterStock={combinedStocksFiltered[index][1]}
        weekStock={combinedStocksFiltered[index][2]}
        monthStock={combinedStocksFiltered[index][3]}
        key={combinedStocksFiltered[index][0][0]}
      />
    ));
  } else {
    stockRows = (
      <tr>
        <td>Loading Some More</td>
      </tr>
    );
  }
  return (
    <span>
      {isFetching ? (
        <span>Loading</span>
      ) : todayStocks ? (
        <div className="container stockElement bordered">
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
                />
              </label>
            </div>
          </div>
          <div className="row">
            <table className="table table-bordered">
              <thead>
                {combinedStocks.length ? (
                  <StockHeader stocks={combinedStocks} />
                ) : (
                  <tr>
                    <th>Loading</th>
                  </tr>
                )}
              </thead>
              <tbody>{stockRows}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <span>Still Loading...</span>
      )}
    </span>
  );
};

const mapStateToProps = state => {
  return {
    todayStocks: state.todayStocks,
    yesterStocks: state.yesterStocks,
    weekStocks: state.weekStocks,
    monthStocks: state.monthStocks,
    isFetching: state.isFetching,
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
