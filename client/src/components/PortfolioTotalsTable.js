import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { formatValueChange, formatMoney, costBasis, getValueSum } from '../helpers';

class PortfolioTotalsTable extends PureComponent {
  render() {
    const { cash, transactions, investments } = this.props;
    return (
      <div>
        <h5>Totals:</h5>
        <Table striped className="StockTable">
          <thead>
            <tr>
              <th className="reg-th">Cash</th>
              <th className="reg-th">Cost Basis</th>
              <th className="reg-th">Current Value</th>
              <th className="reg-th">Profit/Loss</th>
              <th className="reg-th">1d</th>
              <th className="reg-th">7d</th>
              <th className="reg-th">30d</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${formatMoney(cash)}</td>
              <td>${formatMoney(costBasis(transactions))}</td>
              <td>${formatMoney(getValueSum(investments, 'currentValue'))}</td>
              <td>${formatMoney(getValueSum(investments, 'currentValue') - costBasis(transactions))}</td>
              <td>{formatValueChange(getValueSum(investments, 'oneDayDiff'))}</td>
              <td>{formatValueChange(getValueSum(investments, 'sevenDayDiff'))}</td>
              <td>{formatValueChange(getValueSum(investments, 'thirtyDayDiff'))}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

PortfolioTotalsTable.propTypes = {
  cash: PropTypes.number,
  transactions: PropTypes.array.isRequired,
  investments: PropTypes.array.isRequired
};

export default PortfolioTotalsTable;
