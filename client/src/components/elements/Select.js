import React from "react";

const Select = props => {
  const { options, ...restOfProps } = props;
  const optionElements = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.text}
    </option>
  ));

  return (
    <select className="form-control" {...restOfProps}>
      {optionElements}
    </select>
  );
};

export default Select;
