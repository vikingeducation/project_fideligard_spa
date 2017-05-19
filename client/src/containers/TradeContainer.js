import React, { Component } from "react";
import { connect } from "react-redux";
import { updateResults } from "../actions";
import PurchaseForm from "../components/PurchaseForm";
import StatusTable from "../components/StatusTable";
import MainPanelContainer from "./MainPanelContainer";

class TradeContainer extends Component {
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
        <div className="row">
          <PurchaseForm />
          <StatusTable money={this.props.money} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
