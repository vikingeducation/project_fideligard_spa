import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getInitialStocks } from "../actions";
import Table from "../components/table";
import Filter from "../components/filter";

class StockPriceWindowContainer extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getInitialStocks();
  }

  componentWillReceiveProps(newProps) {
    console.log("this is in will receive props", newProps);
    if (newProps.searchTerm !== "") {
      newProps.results = newProps.results.filter(stock => {
        return stock.ticker.includes(newProps.searchTerm);
      });
    }
    this.setState({
      results: newProps.results
    });
  }

  render() {
    const { results, isFetching, searchTerm } = this.props;
    return (
      <div>
        <Filter />
        <Table
          results={results}
          isFetching={isFetching}
          searchTerm={searchTerm}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    results: state.results,
    isFetching: state.isFetching,
    searchTerm: state.searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInitialStocks: () => {
      dispatch(getInitialStocks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StockPriceWindowContainer
);
