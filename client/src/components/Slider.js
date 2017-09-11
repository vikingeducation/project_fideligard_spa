import React from "react";

export const Slider = props => {
  return (
    <div className="Slider">
      <input type="range" list="tickmarks" />
      <input
        type="date"
        defaultValue={props.date}
        onChange={e => {
          props.setSidebarData(
            props.stockData[e.target.value],
            props.stockData,
            e.target.value
          );
          props.setDate(e.target.value);
        }}
      />
    </div>
  );
};
