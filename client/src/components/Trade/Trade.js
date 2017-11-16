import Input from "../elements/Input";
import InputGroup from "../elements/InputGroup";
import Button from "../elements/Button";
import React from "react";
import PropTypes from "prop-types";
import serialize from "form-serialize";
import { withRouter } from "react-router-dom";
import {
  setTradeSymbol,
  setTradePrice,
  setTradeDate,
  setTradeQuantity,
  setTradeBuy,
  setCashAmount,
  setTransaction
} from "../../actions";
import { displayDate } from "../../helpers/helper";
import { connect } from "react-redux";

const Trade = ({
  trade,
  cash,
  setSymbol,
  setPrice,
  setDate,
  setQuantity,
  setBuy,
  setCash,
  tradeStock,
  valid
}) => {
  let cost;
  if (trade.price) {
    cost = trade.price[0] * trade.quantity;
  } else {
    cost = "";
  }
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
  return (
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
          value={trade.date[0]}
          onChange={e => {
            setDate(e.target.value);
          }}
        />
        <Input name="date" type="hidden" value={trade.date} />
      </InputGroup>
      <p>
        <b>Price</b> ${trade.price ? Number(trade.price[0]).toFixed(2) : "ERR"}
      </p>
      <Input type="hidden" value={trade.price} name="price" />
      <p>
        <b>Cost</b> ${cost ? cost.toFixed(2) : "0"}
      </p>
      <Input type="hidden" value={cash} name="cash" />
      {submitButton}
    </form>
  );
};

const mapStateToProps = state => {
  return {
    trade: state.trade,
    todayStocks: state.todayStocks,
    yesterStocks: state.yesterStocks,
    weekStocks: state.weekStocks,
    monthStocks: state.monthStocks,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trade));
