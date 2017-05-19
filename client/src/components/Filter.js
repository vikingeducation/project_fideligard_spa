import React from "react";
import InputGroup from "./elements/InputGroup";
import Input from "./elements/Input";

const Filter = ({ name, onChange, onKeyUp }) => {
  return (
    <InputGroup>
      <Input name={name} onChange={onChange} onKeyUp={onKeyUp} />
    </InputGroup>
  );
};

export default Filter;
