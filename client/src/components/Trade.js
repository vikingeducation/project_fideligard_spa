import React from "react";
import InputGroup from "./elements/InputGroup";
import Input from "./elements/Input";
import Select from "./elements/Select";
import Button from "./elements/Button";
import currencyFormatter from "currency-formatter";
import { Prompt } from "react-router-dom";
import moment from "moment";

let dateMax = moment().subtract(1, "day").format("YYYY-MM-DD");

const ownedQuantity = (portfolio, symbol) => {
  let stock = portfolio.find(port => port.symbol === symbol);
  return stock ? stock.quantity : 0;
};

const StocksDropdown = ({ stocks, trade, history }) => {
  let options = stocks.map(stock => {
    return { value: stock.symbol, text: stock.symbol };
  });
  return (
    <Select
      options={options}
      value={trade.symbol}
      name="symbol"
      onChange={e => history.push(`/trade?symbol=${e.target.value}`)}
    />
  );
};

const OrderStatus = (trade, cash, portfolio, symbol) => {
  if (cash < trade.quantity * trade.day_0 && trade.type === "buy") {
    return (
      <p>
        <strong>ORDER STATUS: </strong>
        <span className="invalid">You don't have enough money.</span>
      </p>
    );
  } else if (
    trade.type === "sell" &&
    ownedQuantity(portfolio, symbol) < trade.quantity
  ) {
    return (
      <p>
        <strong>ORDER STATUS: </strong>
        <span className="invalid">You don't have that many stocks.</span>
      </p>
    );
  } else {
    return (
      <p><strong>ORDER STATUS: </strong><span className="valid">Valid</span></p>
    );
  }
};

const Trade = ({
  trade,
  date,
  changeQuantity,
  changeDate,
  stocks,
  history,
  onSubmit,
  cash,
  transactions,
  changeType,
  portfolio
}) => {
  return (
    <div className="border">
      <h2>Trade</h2>
      <div className="row">
        <form className="col" onSubmit={onSubmit(cash)}>
          <InputGroup name="symbol" labelText="Symbol">
            <StocksDropdown stocks={stocks} trade={trade} history={history} />
          </InputGroup>
          <InputGroup name="type" labelText="Buy/Sell">
            <Select
              options={[
                { value: "buy", text: "Buy" },
                { value: "sell", text: "Sell" }
              ]}
              name="type"
              onChange={changeType}
            />
          </InputGroup>
          <InputGroup name="quantity" labelText="Quantity">
            <Input
              name="quantity"
              type="number"
              onChange={changeQuantity}
              value={trade.quantity}
            />
          </InputGroup>
          <InputGroup name="date" labelText="Date">
            <Input
              name="date"
              type="date"
              min="2017-05-01"
              max={dateMax}
              value={date}
              onChange={changeDate}
            />
          </InputGroup>
          <InputGroup name="price" labelText="Price">
            <Input
              name="price"
              value={currencyFormatter.format(+trade.day_0, { code: "USD" })}
              disabled
            />
          </InputGroup>
          <InputGroup name="cost" labelText="Cost">
            <Input
              name="cost"
              value={currencyFormatter.format(trade.quantity * trade.day_0, {
                code: "USD"
              })}
              disabled
            />
          </InputGroup>
          <Prompt
            when={trade.quantity > 1}
            message="Are you sure you want to continue?"
          />
          <Button color="primary" type="submit">
            Place Order!
          </Button>

        </form>

        <div className="col padding">
          {trade.type === "sell"
            ? <p>You have: {ownedQuantity(portfolio, trade.symbol)}</p>
            : null}
          <p>
            <strong>Cash available: </strong>
            {currencyFormatter.format(cash, { code: "USD" })}
          </p>
          {OrderStatus(trade, cash, portfolio, trade.symbol)}
        </div>
      </div>
    </div>
  );
};

export default Trade;
