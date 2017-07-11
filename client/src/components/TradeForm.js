import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Prompt } from "react-router-dom";

class TradeForm extends Component {
  constructor() {
    super();
    this.state = { hasFormData: false };
  }

  onQuantityChange = e => {
    this.setState({
      hasFormData: true
    });
    this.props.onChange(e);
  };

  onSubmit = (e, balance) => {
    e.preventDefault();
    let form = { ...e };
    this.setState(
      {
        hasFormData: false
      },
      () => {
        this.props.onSubmit(form, balance, this.props.portfolio);
      }
    );
  };

  render() {
    const { stock, total, date, balance } = this.props;
    return (
      <Form
        onSubmit={e => this.onSubmit(e, balance)}
        className="primary-trade-input"
      >
        <FormControl
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={this.onQuantityChange}
        />
        <br />
        <FormControl componentClass="select" name="type">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </FormControl>
        <br />
        <h5>Stock: {stock.symbol}</h5>
        <h5>Price: ${stock.today}</h5>
        <h5>Total: ${total}</h5>
        <h5>Your Current Balance: ${balance}</h5>
        {stock.today === 0 || total === 0
          ? <Button bsStyle="success" disabled block>Make Transaction</Button>
          : <Button bsStyle="success" type="submit" block>
              Make Transaction
            </Button>}
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
