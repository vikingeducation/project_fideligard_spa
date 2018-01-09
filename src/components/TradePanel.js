import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class TradePanel extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="panel">
        <div className="row">
          <h2>Trade</h2>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <p>Symbol: {this.props.match.params.ticker}</p>
            <div className="input-group">
              <form>
                <label htmlFor="buy-sell">Buy/Sell:</label>
                <select
                  form="trade"
                  onChange={this.props.changeOrderType}
                  className="form-control"
                  placeholder="BUY"
                >
                  <option value="BUY">Buy</option>
                  <option value="SELL">Sell</option>
                </select>
                <input
                  type="hidden"
                  name="orderType"
                  value={this.props.orderType}
                />

                <label htmlFor="quantity">Quantity:</label>
                <input type="number" name="quantity" className="form-control" />

                <p>Today's Date: 1/4/2018</p>
                <p>Price: $100.00</p>
                <p>Cost: $10.00</p>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-xs-6">
            <p>Your Cash Balance:</p>
            <p>${this.props.balance}</p>
            <br />
            <p>Order Status:</p>
            <p className="status-color">VALID</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TradePanel;
