import React, { Component } from "react";
import { connect } from "react-redux";
import { getInitialStocks, updateResults } from "../actions";
import Table from "../components/table";
import Filter from "../components/filter";

class StockPriceWindowContainer extends Component {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    this.props.getInitialStocks();
  }

  componentWillReceiveProps(newProps) {
    let newResults = newProps.results;

    if (newProps.searchTerm !== "") {
      newResults = newResults.filter(stock => {
        return stock.ticker.includes(newProps.searchTerm);
      });
      this.props.updateResults(newResults);
    }
  }

  render() {
    const { filteredResults, isFetching, searchTerm } = this.props;
    return (
      <div className="col-sm-6">
        <Filter />
        <Table
          results={filteredResults}
          isFetching={isFetching}
          searchTerm={searchTerm}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.results,
    isFetching: state.isFetching,
    searchTerm: state.searchTerm,
    filteredResults: state.filteredResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInitialStocks: () => {
      dispatch(getInitialStocks());
    },
    updateResults: newResults => {
      dispatch(updateResults(newResults));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StockPriceWindowContainer
);
