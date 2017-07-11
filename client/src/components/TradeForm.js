import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const TradeForm = ({ onSubmit, onChange, stock, total, date, balance }) => {
  return (
    <Form onSubmit={e => onSubmit(e, balance)}>
      <FormControl
        type="number"
        name="quantity"
        placeholder="Quantity"
        onChange={onChange}
      />
      <h4>Price: ${stock.today}</h4>
      <h4>Total: ${total}</h4>
      <h4>Your Current Balance: ${balance}</h4>
      {stock.today === 0 || total === 0
        ? <Button bsStyle="success" disabled block>Buy</Button>
        : <Button bsStyle="success" type="submit" block>Buy</Button>}
      <input type="hidden" name="price" value={stock.today} />
      <input type="hidden" name="total" value={total} />
      <input type="hidden" name="symbol" value={stock.symbol} />
      <input type="hidden" name="date" value={date} />
    </Form>
  );
};

export default TradeForm;