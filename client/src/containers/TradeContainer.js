import React from "react";
import Dropdown from "../components/Dropdown";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import Button from "../components/elements/Button";
import { connect } from "react-redux";

const TradeContainer = ({}) => {
  return (
    <div className="container trade bordered">
      <div className="row">
        <div className="col-8">
          <h4>Trade</h4>
        </div>
        <div className="col-4">
          <Dropdown />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form>
            <InputGroup name="symbol" labelText="Symbol">
              <Input name="symbol" />
            </InputGroup>
            <InputGroup name="buy" labelText="Buy/Sell">
              <select name="buy">
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </InputGroup>
            <InputGroup name="quantity" labelText="Quantity">
              <Input name="quantity" />
            </InputGroup>
            <InputGroup name="date" labelText="Date">
              <Input name="date" type="date" />
            </InputGroup>
            <p>
              <b>Price</b> $123.45
            </p>
            <p>
              <b>Cost</b> $123.45
            </p>
            <Button color="primary" type="button">
              Place Order!
            </Button>
          </form>
        </div>
        <div className="col">
          <h5>Cash Available:</h5>
          <p>$123,456.78</p>
          <h5>Order Status</h5>
          <p className="success">VALID</p>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

export default connect()(TradeContainer);
