import React from "react";
import InputGroup from "./elements/InputGroup";
import Input from "./elements/Input";

const Filter = ({ name, onChange, onKeyUp, placeholder }) => {
  return (
    <InputGroup>
      <Input
        name={name}
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
      />
    </InputGroup>
  );
};

export default Filter;
