import React from "react";
import InputGroup from "../../elements/InputGroup";
import Input from "../../elements/Input";

const TradeSymbol = ({ setSymbol, setPrice, trade, stocks }) => {
  return (
    <InputGroup name="symbol" labelText="Symbol">
      <Input
        name="symbol"
        onChange={e => {
          setSymbol(e.target.value.toUpperCase());
        }}
        value={trade.symbol.toUpperCase()}
      />
    </InputGroup>
  );
};

export default TradeSymbol;
