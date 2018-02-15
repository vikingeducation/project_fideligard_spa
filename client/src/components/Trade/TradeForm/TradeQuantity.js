import React from "react";
import InputGroup from "../../elements/InputGroup";
import Input from "../../elements/Input";

const TradeQuantity = ({ setQuantity, trade }) => {
  return (
    <InputGroup name="quantity" labelText="Quantity">
      <Input
        name="quantity"
        value={trade.quantity}
        onChange={e => {
          setQuantity(e.target.value);
        }}
      />
    </InputGroup>
  );
};

export default TradeQuantity;
