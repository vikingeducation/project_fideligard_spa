import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Loader from './elements/Loader';
import { Alert, Table } from 'reactstrap';
import SortCaret from './elements/SortCaret';
import { formatValueChange } from '../helpers';

class StockValues extends Component {
  componentWillMount() {
    const { getStocks, selectedDate } = this.props;
    getStocks(selectedDate);
  }

  render() {
    const { stocks, isFetching, error, selectedDate, sort,
      sortDirection, sortColumn, getTradeInfo } = this.props;

    const tableHead = (
      <thead>
        <tr>
          <th scope="col" onClick={() => sort('code')}>
            Symbol
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'code'}
            />
          </th>

          <th scope="col" onClick={() => sort('currentPrice')}>
            Price
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

          <th scope="col" className="trade-th">Trade?</th>
        </tr>
      </thead>
    );

    const tableRows = stocks.map(stock => {
      return (
        <tr key={stock.code}>
          <td>{stock.code}</td>
          <td>${stock.currentPrice.toFixed(2)}</td>
          <td>{formatValueChange(stock.oneDayDiff)}</td>
          <td>{formatValueChange(stock.sevenDayDiff)}</td>
          <td>{formatValueChange(stock.thirtyDayDiff)}</td>
          <td><a href="" onClick={(e) => getTradeInfo(stock.code, e)}>trade</a></td>
        </tr>
      );
    });

    return (
      <Card className="StockValues">
        <CardHeader tag="h3">Stocks</CardHeader>
        <CardBody>
          {error
            ? <Alert color="danger">{error.message}</Alert>
            : null}
          <h4 className="text-center">{selectedDate}</h4>
          {isFetching
            ? <Loader />
            : (
              <Table striped className="StockTable">
                {tableHead}
                <tbody>
                  {tableRows}
                </tbody>
              </Table>
            )}
        </CardBody>
      </Card>
    );
  }
}

StockValues.propTypes = {
  getStocks: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  stocks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  sort: PropTypes.func.isRequired,
  error: PropTypes.object,
  sortDirection: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  getTradeInfo: PropTypes.func.isRequired
};

export default StockValues;
