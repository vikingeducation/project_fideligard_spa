import React, { Component } from "react";
import { Form, Col, Panel, FormControl, Button } from "react-bootstrap";
import Decimal from "decimal.js";

class Trades extends Component {
  constructor() {
    super();
    this.state = {
      total: 0
    };
  }
  onQuantityChange = e => {
    let quantity = new Decimal(e.target.value);
    let price = new Decimal(this.props.stock.today);
    this.setState({
      total: price.times(quantity).toString()
    });
  };

  render() {
    const { stock, isFetching, date, onChangeStock, onSubmit } = this.props;
    let { total } = this.state;

    if (isFetching) {
      return <span className="img-loader" />;
    }

    return (
      <Col md={6}>
        <Panel header="Trades">
          <Form
            horizontal
            onSubmit={e => onChangeStock(e, date)}
            className="stock-trade-input"
          >
            <Col md={8}>
              <FormControl defaultValue={stock.symbol} name="symbol" />
            </Col>
            <Col md={4}>
              <Button type="submit" bsStyle="success">Change Stock</Button>
            </Col>
          </Form>
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
          </Form>
        </Panel>
      </Col>
    );
  }
}

// const Trades = ({stock, isFetching, date, onChangeStock}) => {
//   if (isFetching) {
//     return <span className="img-loader" />;
//   }

//   return (
//     <Col md={6}>
//       <Panel header="Trades">
//         <Form horizontal onSubmit={(e)=> onChangeStock(e, date)} className="stock-trade-input">
//           <Col md={8}>
//             <FormControl
//               defaultValue={stock.symbol}
//               name="symbol"
//             />
//           </Col>
//           <Col md={4}>
//             <Button type="submit" bsStyle="success">Change Stock</Button>
//           </Col>
//         </Form>
//         <FormControl type="number" name="quantity" placeholder="Quantity" />
//         <h4>Price: ${stock.today}</h4>
//         {stock.today === 0 ?
//         <Button bsStyle="success" disabled>Submit</Button> :
//         <Button type="submit">Submit</Button>
//         }
//       </Panel>
//     </Col>
//   )
// };

export default Trades;
