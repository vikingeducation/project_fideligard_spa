import React from "react";

const Stocks = () => {
  return (
    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
      <h1>Stocks</h1>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Overview <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Reports</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Analytics</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Export</a>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">Nav item</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Nav item again</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">One more nav</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Another nav item</a>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">Nav item again</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">One more nav</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Another nav item</a>
        </li>
      </ul>
    </nav>
  );
};

export default Stocks;
