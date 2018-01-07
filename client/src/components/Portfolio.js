import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Alert, Table } from 'reactstrap';
import Loader from './elements/Loader';
import NavSelect from './NavSelect';
import { withRouter } from 'react-router-dom';
import PortfolioTableHead from './PortfolioTableHead';
import PortfolioTotalsTable from './PortfolioTotalsTable';
import { formatValueChange, formatMoney, costBasis } from '../helpers';

class Portfolio extends Component {
  componentWillMount() {
    this.props.getPortfolio();
  }

  render() {
    const { cash, investments, transactions, isFetching, error,
      sortDirection, sortColumn, sort, getTradeInfo } = this.props;

    const investmentRows = investments.map(investment => {
      return (
        <tr key={investment.code}>
          <td>{investment.code}</td>
          <td>{investment.quantity}</td>
          <td>${formatMoney(costBasis(transactions, investment.code))}</td>
          <td>${formatMoney(investment.currentValue)}</td>
          <td>${formatMoney(investment.currentValue - costBasis(transactions, investment.code))}</td>
          <td>${formatMoney(investment.currentPrice)}</td>
          <td>{formatValueChange(investment.oneDayDiff)}</td>
          <td>{formatValueChange(investment.sevenDayDiff)}</td>
          <td>{formatValueChange(investment.thirtyDayDiff)}</td>
          <td><a href="" onClick={(e) => getTradeInfo(investment.code, e)}>trade</a></td>
        </tr>
      );
    });

    return (
      <Card className="Portfolio">
        <CardHeader>
          <h3 className="PageTitle">Portfolio</h3>
          <NavSelect />
        </CardHeader>
        <CardBody>
          {error
            ? <Alert color="danger">{error.message}</Alert>
            : null}
          {isFetching
            ? <Loader />
            : (
              <div>
                <PortfolioTotalsTable
                  cash={cash}
                  transactions={transactions}
                  investments={investments}
                />
                <h5>Portfolio:</h5>
                <Table striped className="StockTable">
                  <PortfolioTableHead
                    sort={sort}
                    sortDirection={sortDirection}
                    sortColumn={sortColumn}
                  />
                  <tbody>
                    {investmentRows}
                  </tbody>
                </Table>
              </div>
            )}
        </CardBody>
      </Card>
    );
  }
}

Portfolio.propTypes = {
  sort: PropTypes.func.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  investments: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  sortDirection: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  getTradeInfo: PropTypes.func.isRequired,
  cash: PropTypes.number
};

export default withRouter(Portfolio);
