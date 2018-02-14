import Input from "../elements/Input";
import InputGroup from "../elements/InputGroup";
import Button from "../elements/Button";
import React, { Component } from "react";
import PropTypes from "prop-types";
import serialize from "form-serialize";
import {
  setTradeSymbol,
  setTradePrice,
  setTradeDate,
  setTradeQuantity,
  setTradeBuy,
  setCashAmount,
  setTransaction
} from "../../actions";
import { displayDate, inputDate } from "../../helpers/helper";
import { connect } from "react-redux";

class TradeForm extends Component {
  componentWillMount() {
    console.log(this.props.match.params);
    if (Object.keys(this.props.match.params).length) {
      this.props.setDate(this.props.match.params.date);
      this.props.setSymbol(this.props.match.params.symbol);
      this.props.setPrice(this.props.match.params.price);
    } else {
      this.props.setDate(new Date());
      this.props.setSymbol("");
      this.props.setPrice(0);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      console.log("MATCH!!!!!");
      if (Object.keys(this.props.match.params).length) {
        this.props.setDate(this.props.match.params.date);
        this.props.setSymbol(this.props.match.params.symbol);
        this.props.setPrice(this.props.match.params.price);
      } else {
        this.props.setDate(new Date());
        this.props.setSymbol("");
        this.props.setPrice(0);
      }
    }
  }
  submitButtonFunc = (trade, valid) => {
    let submitButton;
    if (trade.buy === "BUY") {
      if (valid) {
        submitButton = (
          <Button color="primary" type="submit">
            Place Order!
          </Button>
        );
      } else {
        submitButton = (
          <Button color="primary" type="submit" disabled>
            Too Much!
          </Button>
        );
      }
    } else if (trade.buy === "SELL") {
      if (valid) {
        submitButton = (
          <Button color="primary" type="submit">
            Sell Stocks!
          </Button>
        );
      } else {
        submitButton = (
          <Button color="primary" type="submit" disabled>
            Don't Own!
          </Button>
        );
      }
    }
    return submitButton;
  };

  render() {
    const {
      match,
      stocks,
      trade,
      cash,
      transactions,
      tradeStock,
      setSymbol,
      setBuy,
      setQuantity,
      setDate
    } = this.props;
    //trade: { symbol: "", price: [0], date: [0], quantity: 0, buy: "BUY" }

    let valid = true;
    let cost;
    if (trade.price) {
      cost = trade.price * trade.quantity;
    } else {
      cost = "";
    }
    if (Number(cost) > Number(cash)) {
      valid = false;
    }
    let submitButton = this.submitButtonFunc(trade, valid);

    return (
      <div className="row">
        <div className="col">
          <form onSubmit={tradeStock}>
            <InputGroup name="symbol" labelText="Symbol">
              <Input
                name="symbol"
                onChange={e => {
                  setSymbol(e.target.value);
                }}
                value={trade.symbol}
              />
            </InputGroup>
            <InputGroup name="type" labelText="Buy/Sell">
              <select
                name="type"
                onChange={e => {
                  setBuy(e.target.value);
                }}
                defaultValue={trade.buy}
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </InputGroup>
            <InputGroup name="quantity" labelText="Quantity">
              <Input
                name="quantity"
                value={trade.quantity}
                onChange={e => {
                  setQuantity(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup name="date" labelText="Date">
              <Input
                name="dateToShow"
                type="date"
                value={inputDate(trade.date)}
                onChange={e => {
                  setDate(e.target.value);
                }}
              />
              <Input name="date" type="hidden" value={trade.date} />
              <p>{displayDate(trade.date)}</p>
            </InputGroup>
            <p>
              <b>Price</b> ${trade.price
                ? Number(trade.price).toFixed(2)
                : "ERR"}
            </p>
            <Input type="hidden" value={trade.price} name="price" />
            <p>
              <b>Cost</b> ${cost ? cost.toFixed(2) : "0"}
            </p>
            <Input type="hidden" value={cash} name="cash" />
            {submitButton}
          </form>
        </div>
        <div className="col">
          <h5>Cash Available:</h5>
          <p>${this.props.cash.toFixed(2)}</p>
          <h5>Order Status</h5>
          {valid ? "VALID" : "NOT VALID"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks,
    cash: state.cash,
    transactions: state.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSymbol: symbol => {
      dispatch(setTradeSymbol(symbol));
    },
    setPrice: price => {
      dispatch(setTradePrice(price));
    },
    setDate: date => {
      dispatch(setTradeDate(date));
    },
    setQuantity: quantity => {
      dispatch(setTradeQuantity(quantity));
    },
    setBuy: buy => {
      dispatch(setTradeBuy(buy));
    },
    tradeStock: e => {
      e.preventDefault();
      const form = e.target;
      let data = serialize(form, { hash: true });
      data.date = data.date.split(",");
      data.price = data.price.split(",");
      data.date[0] = displayDate(data.date[0]);
      data.date[1] = displayDate(data.date[1]);
      data.date[2] = displayDate(data.date[2]);
      data.date[3] = displayDate(data.date[3]);
      data.quantity = Number(data.quantity);
      if (data.quantity > 0) {
        console.log(data);
        dispatch(setTransaction(data));
        if (data.type === "BUY") {
          dispatch(
            setCashAmount(Number(data.cash) - data.quantity * data.price[0])
          );
        } else {
          dispatch(
            setCashAmount(Number(data.cash) + data.quantity * data.price[0])
          );
        }

        form.reset();
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm);
