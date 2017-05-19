import React from "react";
import InputGroup from "./elements/InputGroup";
import Input from "./elements/Input";
import Select from "./elements/Select";
import Button from "./elements/Button";
import currencyFormatter from "currency-formatter";

const StocksDropdown = ({ stocks, trade, history }) => {
  let options = stocks.map(stock => {
    return { value: stock.symbol, text: stock.symbol };
  });
  return (
    <Select
      options={options}
      value={trade.symbol}
      onChange={e => history.push(`/trade?symbol=${e.target.value}`)}
    />
  );
};

const Trade = ({
  trade,
  date,
  changeQuantity,
  changeDate,
  stocks,
  history
}) => {
  return (
    <div className="border">
      <h2>Trade</h2>
      <div className="row">
        <form className="col">
          <InputGroup name="symbol" labelText="Symbol">
            <StocksDropdown stocks={stocks} trade={trade} history={history} />
          </InputGroup>
          <InputGroup name="buyOrSell" labelText="Buy/Sell">
            <Select
              options={[
                { value: "buy", text: "Buy" },
                { value: "sell", text: "Sell" }
              ]}
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
              max="2017-05-18"
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
          <Button color="primary" type="submit">
            Place Order!
          </Button>
        </form>

        <div className="col padding">
          <p>
            <strong>Cash available: </strong>
            {currencyFormatter.format(1000, { code: "USD" })}
          </p>
          <p><strong>ORDER STATUS: </strong>Valid</p>
        </div>
      </div>
    </div>
  );
};

export default Trade;
