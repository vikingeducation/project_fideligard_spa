import React from "react";
import InputGroup from "../../elements/InputGroup";
import Input from "../../elements/Input";
import { inputDate, apiDate } from "../../../helpers/helper";

const TradeDate = ({
  setDate,
  setPrice,
  trade,
  stocks,
  setDateData,
  getApiData
}) => {
  return (
    <InputGroup name="date" labelText="Date">
      <Input
        name="dateToShow"
        type="date"
        onChange={e => {
          let date = new Date(e.target.value);
          date.setDate(date.getDate() + 1);

          date = apiDate(date);
          setDate(date);
        }}
        value={inputDate(trade.date)}
      />
    </InputGroup>
  );
};

export default TradeDate;
