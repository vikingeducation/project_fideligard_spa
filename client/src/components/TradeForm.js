import React from 'react';
import { Form, FormControl, Button } from "react-bootstrap";

const TradeForm = ({onSubmit, onChange, stock, total, date}) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormControl
        type="number"
        name="quantity"
        placeholder="Quantity"
        onChange={onChange}
      />
      <h4>Price: ${stock.today}</h4>
      {stock.today === 0 || total === 0
        ? <Button bsStyle="success" disabled>Buy</Button>
        : <Button bsStyle="success" type="submit">Buy</Button>}
      <h4>Total: ${total}</h4>
      <input type="hidden" name="price" value={stock.today} />
      <input type="hidden" name="total" value={total} />
      <input type="hidden" name="symbol" value={stock.symbol} />
      <input type="hidden" name="date" value={date} />
    </Form>
  )
};

export default TradeForm;

/*
<Form onSubmit={onSubmit}>
            <FormControl
              type="number"
              name="quantity"
              placeholder="Quantity"
              onChange={this.onQuantityChange}
            />
            <h4>Price: ${stock.today}</h4>
            {stock.today === 0 || total === 0
              ? <Button bsStyle="success" disabled>Buy</Button>
              : <Button bsStyle="success" type="submit">Buy</Button>}
            <h4>Total: ${total}</h4>
            <input type="hidden" name="price" value={stock.today} />
            <input type="hidden" name="total" value={total} />
            <input type="hidden" name="symbol" value={stock.symbol} />
            <input type="hidden" name="date" value={date} />
          </Form>
*/