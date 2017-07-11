import React from "react";
import { Panel } from "react-bootstrap";
import FilterContainer from "../containers/FilterContainer";
import StockTableContainer from "../containers/StockTableContainer";

const StockData = props => {
  const { stockWatchlist, date, isFetching, sortDirection } = props;
  return (
    <Panel header={`Stock Data for ${date}`}>
      <FilterContainer stockWatchlist={stockWatchlist} date={date} />
      {isFetching
        ? <span className="img-loader" />
        : <StockTableContainer sortDirection={sortDirection} date={date} />}
    </Panel>
  );
};

export default StockData;
