import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortCaret from './elements/SortCaret';

class StockTableHead extends Component {
  render() {
    const { sort, sortDirection, sortColumn } = this.props;

    return (
      <thead>
        <tr>
          <th scope="col" onClick={() => sort('code')}>
            Symbol
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'code'}
            />
          </th>

          <th scope="col" onClick={() => sort('quantity')}>
            Quantity
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'quantity'}
            />
          </th>

          <th scope="col" onClick={() => sort('costBasis')}>
            Cost Basis
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'costBasis'}
            />
          </th>

          <th scope="col" onClick={() => sort('currentValue')}>
            Current Value
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'currentValue'}
            />
          </th>

          <th scope="col" onClick={() => sort('profitLoss')}>
            Profit/Loss
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'profitLoss'}
            />
          </th>

          <th scope="col" onClick={() => sort('currentPrice')}>
            Current Price
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'currentPrice'}
            />
          </th>

          <th scope="col" onClick={() => sort('oneDayDiff')}>
            1d
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'oneDayDiff'}
            />
          </th>

          <th scope="col" onClick={() => sort('sevenDayDiff')}>
            7d
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'sevenDayDiff'}
            />
          </th>

          <th scope="col" onClick={() => sort('thirtyDayDiff')}>
            30d
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'thirtyDayDiff'}
            />
          </th>

          <th scope="col" className="reg-th">Trade?</th>
        </tr>
      </thead>
    );
  }
}

StockTableHead.propTypes = {
  sort: PropTypes.func.isRequired,
  sortColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired
};

export default StockTableHead;
