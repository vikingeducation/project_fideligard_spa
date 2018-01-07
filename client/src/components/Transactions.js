import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Alert, Table } from 'reactstrap';
import NavSelect from './NavSelect';
import SortCaret from './elements/SortCaret';
import { withRouter } from 'react-router-dom';
import Loader from './elements/Loader';
import moment from 'moment';
import { formatMoney } from '../helpers';

class Transactions extends Component {
  componentWillMount() {
    this.props.getTransactions();
  }

  render() {
    const { transactions, sort, sortColumn, sortDirection, error, isFetching } = this.props;

    const tableHead = (
      <thead>
        <tr>
          <th scope="col" onClick={() => sort('createdAt')}>
            Date
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'createdAt'}
            />
          </th>

          <th scope="col" onClick={() => sort('ticker')}>
            Symbol
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'ticker'}
            />
          </th>

          <th scope="col" onClick={() => sort('type')}>
            Type
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'type'}
            />
          </th>

          <th scope="col" onClick={() => sort('shares')}>
            Quantity
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'shares'}
            />
          </th>

          <th scope="col" onClick={() => sort('price')}>
            Price
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'price'}
            />
          </th>

          <th scope="col" onClick={() => sort('cost')}>
            Total
            <SortCaret
              direction={sortDirection}
              isSortedColumn={sortColumn === 'cost'}
            />
          </th>
        </tr>
      </thead>
    );

    const tableRows = transactions.map(transaction => {
      return (
        <tr key={transaction._id}>
          <td>{moment(transaction.date).format('MM/DD/YY')}</td>
          <td>{transaction.ticker}</td>
          <td>{transaction.type}</td>
          <td>{transaction.shares.toLocaleString()}</td>
          <td>${formatMoney(transaction.price)}</td>
          <td>${formatMoney(transaction.cost)}</td>
        </tr>
      );
    });

    return (
      <Card className="Transactions">
        <CardHeader>
          <h3 className="PageTitle">Transactions</h3>
          <NavSelect />
        </CardHeader>
        <CardBody>
          {error
            ? <Alert color="danger">{error.message}</Alert>
            : null}
          {isFetching
            ? <Loader />
            : (
              <Table striped className="TransactionTable">
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

Transactions.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired,
  sortColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired
};

export default withRouter(Transactions);
