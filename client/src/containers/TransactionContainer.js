import React, { Component } from "react";
import { connect } from "react-redux";
import { updateResults } from "../actions";
import TransactionTable from "../components/TransactionTable";
import MainPanelContainer from "./MainPanelContainer";
import Filter from "../components/filter";

class TransactionContainer extends Component {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    //
  }

  // componentWillReceiveProps(newProps) {
  //   let newResults = newProps.results;
  //
  //   if (newProps.searchTerm !== "") {
  //     newResults = newResults.filter(stock => {
  //       return stock.ticker.includes(newProps.searchTerm);
  //     });
  //     this.props.updateResults(newResults);
  //   }
  // }

  render() {
    return (
      <div className="col-sm-6">
        <MainPanelContainer />
        <Filter />
        <div className="row">
          <TransactionTable />
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    money: state.money,
    results: state.results,
    searchTerm: state.searchTerm,
    filteredResults: state.filteredResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateResults: newResults => {
      dispatch(updateResults(newResults));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  TransactionContainer
);
