import React from "react";
import InputGroup from "../../elements/InputGroup";

const TradeBuy = ({ setBuy, trade }) => {
  return (
    <InputGroup name="type" labelText="Buy/Sell">
      <select
        name="type"
        onChange={e => {
          setBuy(e.target.value);
        }}
        defaultValue={trade.buy}
      >
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>
    </InputGroup>
  );
};

export default TradeBuy;
