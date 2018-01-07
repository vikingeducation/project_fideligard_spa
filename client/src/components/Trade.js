import React, { Component } from 'react';
import PropTypes from  'prop-types';
import { withRouter } from 'react-router-dom';
import NavSelect from './NavSelect';
import Loader from './elements/Loader';
import { formatMoney } from '../helpers';
import { Card, CardHeader, CardBody, Form, FormGroup, Label,
  Col, Input, Button, Alert } from 'reactstrap';

class Trade extends Component {
  render() {
    const { cashAvailable, currentPrice, isFetching, error, success,
      quantityOwned, ticker, total, transactionType, isValid, invalidMessage,
      setType, updateTransaction, onSubmit } = this.props;

    const transactionForm = () => {
      if (isFetching) return <Loader/>;

      return (
        <div className="container-fluid">
          <div className="row justify-content-left">
            <div className="col-md-6">
              <Form onSubmit={onSubmit}>
                <FormGroup row>
                  <Label sm={4}>
                    Symbol:
                  </Label>
                  <Col sm={8}>
                    <Input type="hidden" name="ticker" value={ticker} />
                    <p className="input-replacement">{ticker}</p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>
                    Buy/Sell:
                  </Label>
                  <Col sm={8}>
                    <Input type="select" name="transactionType" value={transactionType} onChange={setType}>
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>
                    Quantity:
                  </Label>
                  <Col sm={8}>
                    <Input type="number" name="shares" onChange={updateTransaction} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>
                    Price:
                  </Label>
                  <Col sm={8}>
                    <Input type="hidden" name="price" value={currentPrice} />
                    <p className="input-replacement">${formatMoney(currentPrice)}</p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>
                    {transactionType === 'BUY'
                      ? 'Cost:'
                      : 'Earnings:'}
                  </Label>
                  <Col sm={8}>
                    <Input type="hidden" name="total" value={total} />
                    <p className="input-replacement">${formatMoney(total)}</p>
                  </Col>
                </FormGroup>
                {isValid
                  ? <Button outline color="primary">Submit Transaction</Button>
                  : <Button outline color="primary" disabled>Submit Transaction</Button>}
              </Form>
            </div>
            <div className="col-md-6 Status">
              <h6>Cash Available:</h6>
              <p>${formatMoney(cashAvailable)}</p>
              <h6>Currently Owned:</h6>
              <p>{quantityOwned.toLocaleString()}</p>
              <h6>Transaction Status:</h6>
              {isValid
                ? <p className="text-success">Valid</p>
                : <p className="text-danger">{invalidMessage}</p>}
            </div>
          </div>
        </div>
      );
    };

    return (
      <Card className="Trade">
        <CardHeader>
          <h3 className="PageTitle">Trade</h3>
          <NavSelect />
        </CardHeader>
        <CardBody>
          {error ? <Alert color="danger">{error.message}</Alert> : null}
          {success ? <Alert color="success">{success}</Alert> : null}
          {!ticker
            ? <p className="text-muted text-center">Please select a stock to trade from the stocks panel.</p>
            : transactionForm()}
        </CardBody>
      </Card>
    );
  }
}

Trade.propTypes = {
  cashAvailable: PropTypes.number,
  currentPrice: PropTypes.number,
  quantityOwned: PropTypes.number,
  ticker: PropTypes.string,
  transactionType: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  invalidMessage: PropTypes.string,
  error: PropTypes.object,
  success: PropTypes.string,
  setType: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withRouter(Trade);
