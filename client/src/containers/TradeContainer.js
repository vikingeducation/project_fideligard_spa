import React, { Component } from "react";
import Dropdown from "../components/Dropdown";
import Trade from "../components/Trade/Trade";

import { connect } from "react-redux";

class TradeContainer extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="container trade bordered">
        <div className="row">
          <div className="col-8">
            <h4>Trade</h4>
          </div>
          <div className="col-4">
            <Dropdown />
          </div>
        </div>
        <Trade match={match} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trade: state.trade,
    cash: state.cash,
    transactions: state.transactions,
    stocks: state.stocks
  };
};

export default connect(mapStateToProps)(TradeContainer);
