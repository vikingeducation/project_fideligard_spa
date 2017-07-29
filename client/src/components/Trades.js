import React, { Component } from "react";
import { Form, Col, Panel, FormControl, Button } from "react-bootstrap";
import Decimal from "decimal.js";
import TradeForm from "./TradeForm";

class Trades extends Component {
  constructor() {
    super();
    this.state = {
      total: 0
    };
  }
  onQuantityChange = e => {
    let quantity = new Decimal(e.target.value || 0);
    let price = new Decimal(this.props.stock.today);
    this.setState({
      total: price.times(quantity).toString()
    });
  };

  render() {
    const {
      stock,
      isFetching,
      date,
      onChangeStock,
      onSubmit,
      balance,
      portfolio,
      stockWatchlist
    } = this.props;
    let { total } = this.state;

    if (isFetching) {
      return (
        <Col md={5} xs={12}>
          <Panel header="Trades">
            <span className="img-loader" />
          </Panel>
        </Col>
      );
    }

    return (
      <Col md={5} xs={12}>
        <Panel header="Trades">
          <Form
            onSubmit={e => onChangeStock(e, date, stockWatchlist)}
            className="stock-trade-input"
            horizontal
          >
            <Col md={8}>
              <FormControl defaultValue={stock.symbol} name="symbol" />
            </Col>
            <Col md={4}>
              <Button type="submit" bsStyle="info">Change Stock</Button>
            </Col>
          </Form>
          <br />
          <TradeForm
            balance={balance}
            onSubmit={onSubmit}
            onChange={this.onQuantityChange}
            stock={stock}
            total={total}
            date={date}
            portfolio={portfolio}
          />
        </Panel>
      </Col>
    );
  }
}

export default Trades;
