import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setSearchTerm,
  selectStock,
  selectQuantity,
  sellStock,
  buyStock
} from "../actions";

class PurchaseForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = e => {
    let selected = this.props.results.find(stock => {
      return stock.ticker === e.target.value;
    });
    if (selected) {
      this.props.selectStock(selected);
    } else {
      this.props.selectStock({});
    }
    console.log(selected);
  };

  onQuantChange = e => {
    let value;
    if (e.target.value) {
      value = e.target.value;
    } else {
      value = 0;
    }
    this.props.selectQuantity(Number(value));
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {};
    data.stock = this.selectedStock;
    data.quantity = this.props.quantity;
    if (e.target.type.value === "buy") {
      this.props.buyStock(data);
    } else {
      this.props.sellStock(data);
    }
    console.log(e.target.type.value);
  };

  calcTotalCost = () => {
    let price = this.props.selectedStock.currentPrice;
    if (price) {
      return (price * this.props.quantity).toFixed(2);
    }
    return 0;
  };

  render() {
    return (
      <div className="col-sm-8">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Ticker</label>
            <input onChange={this.onChange} type="text" name="ticker" />
          </div>

          <div className="form-group">
            <label>Buy/Sell</label>
            <select name="type">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              onChange={this.onQuantChange}
              type="number"
              name="quantity"
            />
          </div>

          <div className="form-group">
            <p>Price: {this.props.selectedStock.currentPrice}</p>
          </div>
          <div className="form-group">
            <p>
              Total:
              {" "}
              {this.calcTotalCost()}
            </p>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
//{this.props.selectedStock.currentPrice * this.props.quantity}
const mapStateToProps = state => {
  return {
    results: state.results,
    selectedStock: state.selectedStock,
    quantity: state.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchTerm: term => {
      dispatch(setSearchTerm(term));
    },
    selectStock: stock => {
      dispatch(selectStock(stock));
    },
    sellStock: data => {
      dispatch(sellStock(data));
    },
    buyStock: data => {
      dispatch(buyStock(data));
    },
    selectQuantity: num => {
      dispatch(selectQuantity(num));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);
