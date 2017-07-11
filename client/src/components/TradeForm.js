import React, {Component} from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import {Prompt} from 'react-router-dom';

class TradeForm extends Component {
  constructor() {
    super()
    this.state = {hasFormData: false}
  }
  onQuantityChange = e => {
    this.setState({
      hasFormData: true
    })
    this.props.onChange(e);
  }
  render() {
    const { onSubmit, onChange, stock, total, date, balance } = this.props;
    return (
      <Form onSubmit={e => onSubmit(e, balance)}>
        <FormControl
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={this.onQuantityChange}
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

        <Prompt
          when={this.state.hasFormData}
          message="Are you sure you want to leave? Your form data will be lost!"
        />
      </Form>
    );
  }
}

export default TradeForm;