import React from "react";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";

const Trade = ({
  date,
  symbol,
  balance,
  price,
  changeQuantity,
  total,
  onSubmit
}) => {
  return (
    <div>
      <div className="trade-container">
        <div>
          <form onSubmit={onSubmit}>
            <FormGroup controlId="symbol">
              <ControlLabel>Symbol</ControlLabel>
              <FormControl type="text" value={symbol} />
            </FormGroup>
            <FormGroup controlId="buySell">
              <ControlLabel>Buy/Sell</ControlLabel>
              <FormControl componentClass="select">
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="quantity">
              <ControlLabel>Quantity</ControlLabel>
              <FormControl type="number" onInput={changeQuantity} />
            </FormGroup>
            <FormGroup controlId="date">
              <ControlLabel>Date</ControlLabel>
              <FormControl type="date" value={date} />
            </FormGroup>
            <p>
              <strong>Price: </strong>
              ${price}
            </p>
            <p>
              <strong>Total: </strong>
              ${total}
            </p>
            <Button bsStyle="primary" type="submit">
              Place Order!
            </Button>
          </form>
        </div>
        <div>
          <strong>Cash Available:</strong> ${balance.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Trade;
