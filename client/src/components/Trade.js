import React from "react";
import InputGroup from "./elements/InputGroup";
import Input from "./elements/Input";
import Select from "./elements/Select";
import Button from "./elements/Button";

const Trade = ({ trade, date, changeQuantity }) => {
  return (
    <div className="border">
      <h2>Trade</h2>
      <div className="row">
        <form className="col">
          <InputGroup name="symbol" labelText="Symbol">
            <Input name="symbol" value={trade.symbol} disabled />
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
              disabled
              name="date"
              type="date"
              min="2017-05-01"
              max="2017-05-18"
              value={date}
            />
          </InputGroup>
          <InputGroup name="price" labelText="Price">
            <Input name="price" value={trade.day_0} disabled />
          </InputGroup>
          <InputGroup name="cost" labelText="Cost">
            <Input name="cost" value={trade.quantity * trade.day_0} disabled />
          </InputGroup>
          <Button color="primary" type="submit">
            Place Order!
          </Button>
        </form>

        <div className="col padding">
          <p><strong>Cash available: </strong>1000</p>
          <p><strong>ORDER STATUS: </strong>Valid</p>
        </div>
      </div>
    </div>
  );
};

export default Trade;
