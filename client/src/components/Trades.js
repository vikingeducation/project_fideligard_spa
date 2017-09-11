import React from "react";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";

const Trades = ({ onChange }) => (
  <div>
    <div className="trade-container">
      <div>
        <form>
          <FormGroup controlId="symbol">
            <ControlLabel>Symbol</ControlLabel>
            <FormControl type="text" value="AAPL" />
          </FormGroup>
          <FormGroup controlId="buySell">
            <ControlLabel>Buy/Sell</ControlLabel>
            <FormControl componentClass="select">
              <option>Buy</option>
              <option>Sell</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="quantity">
            <ControlLabel>Quantity</ControlLabel>
            <FormControl type="number" />
          </FormGroup>
          <FormGroup controlId="date">
            <ControlLabel>Date</ControlLabel>
            <FormControl type="date" />
          </FormGroup>
          <ControlLabel>Price</ControlLabel>
          <ControlLabel>Total</ControlLabel>
          <Button bsStyle="primary">Place Order!</Button>
        </form>
      </div>
    </div>
  </div>
);

export default Trades;
