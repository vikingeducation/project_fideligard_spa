import React from "react";
import InputGroup from "./elements/InputGroup";
import Input from "./elements/Input";

const Filter = ({ onChange }) => {
  return (
    <InputGroup>
      <Input name="searchStock" onChange={onChange} />
    </InputGroup>
  );
};

export default Filter;
