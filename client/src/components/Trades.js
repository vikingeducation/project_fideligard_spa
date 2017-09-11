import React from "react";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import Subheader from "./Subheader";

const FormInput = ({
  type,
  message,
  id,
  defaultValue,
  className,
  onChange,
  name
}) =>
  <FormGroup controlId={id} className={className}>
    <ControlLabel>{message}</ControlLabel>{" "}
    <FormControl
      type={type}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  </FormGroup>;

const symbols = [
  "AAPL",
  "FB",
  "GOOGL",
  "PCLN",
  "AMZN",
  "CMG",
  "HOG",
  "ZEUS",
  "BUD",
  "LUV",
  "LVB",
  "GRR",
  "COOL",
  "FIZZ",
  "BOOM"
];

const Trades = (props, state) => {
  console.log(props);
  return (
    <div className="flex-col">
      <div className="Trades-top">
        <Subheader title="Trades" />
      </div>
      <div className="flex-row">
        <form
          className="flex-col Trades-form"
          type="submit"
          onSubmit={props.buyStock}
        >
          <FormGroup controlId="symbol" className="Trades-FormGroup">
            <ControlLabel>Symbol: </ControlLabel>
            <FormControl
              name="symbol"
              componentClass="select"
              onChange={e => {
                console.log(e.target.value);
                console.log(props.stockData);
                props.setSymbol(e);
                props.setThisDatePrice(props.thisDateStocks[e.target.value]);
              }}
            >
              {symbols.map(symbol =>
                <option key={symbol}>
                  {symbol}
                </option>
              )}
            </FormControl>
          </FormGroup>;
          <FormGroup controlId="buySell" className="Trades-FormGroup">
            <ControlLabel>Buy/Sell: </ControlLabel>
            <FormControl componentClass="select" name="buySell">
              <option>Buy</option>
              <option>Sell</option>
            </FormControl>
          </FormGroup>;
          <FormInput
            name="quantity"
            type="number"
            defaultValue="1"
            onChange={props.onQuantityChange}
            className="Trades-FormGroup"
            message="Quantity: "
          />
          <FormGroup controlId="date" className="Trades-FormGroup">
            <ControlLabel>Date: </ControlLabel>
            <FormControl
              name="date"
              type="date"
              defaultValue={props.date}
              onChange={props.onDateChange}
            />
          </FormGroup>
          <ControlLabel name="price">
            <input type="hidden" name="price" value={props.state.price} />
            Price: ${props.state.price}
          </ControlLabel>
          <ControlLabel name="total">
            <input
              type="hidden"
              name="total"
              value={Number(props.state.quantity) * props.state.price}
            />
            Total: {Number(props.state.quantity) * props.state.price}
          </ControlLabel>
          <Button
            bsStyle="primary"
            type="submit"
            style={{ width: "50%", alignSelf: "center", fontSize: "17px" }}
          >
            Place Order!
          </Button>
        </form>
        <div>
          Cash available: {props.balance}
        </div>
      </div>
    </div>
  );
};

export default Trades;
