import React from 'react'
import Header from './Header'
import { Form, Input, FormGroup, Label, Col, InputGroup, InputGroupAddon } from 'reactstrap'
import { Prompt } from 'react-router-dom'


const Trade = ({ history, onSubmit, dates, symbols, stock, updateSymbol, price, quantity, updateQuantity, balance, updateCurrentDate, halfFilled, updateFormStatus, portfolio, setType, type }) => {

  const cost = isNaN(price * quantity) ? '' : (price * quantity).toFixed(2)

  let enoughFunds = balance >= (price * quantity)
  let stocksAvailable = portfolio[stock] ? portfolio[stock].quantity : 0
  let enoughStocks = stocksAvailable >= quantity
  let isValid = (enoughFunds && type === 'BUY') || (enoughStocks && type === 'SELL')

  const stockOptions = symbols.map((symbol) => {
    return <option value={symbol} key={symbol}>{symbol}</option>
  })

  function validateForm(e) {
    e.preventDefault()
    if (isNaN(price)) {
      return
    }
    if (!enoughFunds && type === 'BUY') {
      return alert('Sorry, you don\'t have enough money to buy those shares.')
    }
    if (!enoughStocks && type === 'SELL') {
      return alert('Sorry, you don\'t have that many stocks')
    }
    if (quantity > 0) {
      onSubmit(e)
    }
  }

  return (
    <main id="trade">
      <Header title="Trade" history={history} />
    <div className="row">
    <div className="col-md-8">
     <Form onSubmit={validateForm}>
     <FormGroup row>
     <Label for="symbol" sm={3}>Symbol:</Label>
     <Col sm={9}>
     <Input type="select" value={stock} onChange={ updateSymbol} name="symbol">
     {stockOptions}
     </Input>
     </Col>
     </FormGroup>
      <FormGroup row>
      <Label for="type" sm={3}>Buy/Sell:</Label>
      <Col sm="9">
        <Input type="select" name="type" value={type} onChange={setType}>
         <option value="BUY">Buy</option>
           <option value="SELL">Sell</option>
        </Input>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Label for="quantity" sm="3">Quantity:</Label>
      <Col sm="9">
        <Input type="number" min="1" className="form-control" name="quantity" onChange={updateQuantity} placeholder={0}/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Label for="date" sm={3}>Date:</Label>
         <Col sm="9">
           <Input type="date" min={dates.min} max={dates.max} className="form-control" name="date" value={dates.current} onChange={updateCurrentDate}/>
         </Col>
      </FormGroup>
      <FormGroup row>
      <Label for="price" sm={3}>Price:</Label>
        <Col sm="9"><InputGroup><InputGroupAddon>$</InputGroupAddon><Input type="number" disabled className="form-control" value={`${price ? price.toFixed(2) : '-'}`} name="price" /></InputGroup></Col>
      </FormGroup>
      <FormGroup row>
      <Label for="cost" sm="3">Cost:</Label>
     <Col sm="9">
        <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
          <Input type="text" disabled className="form-control" value={cost}/>
        </InputGroup>
     </Col>
      </FormGroup>
      <button type="submit" className="btn btn-primary mb-4" onClick={updateFormStatus}>Place Order</button>
    </Form>
    </div>
    <div className="col">
    <h5>Cash Available:</h5>
      <p>${balance.toFixed(2)}</p>
      <h5>Shares Owned:</h5>
      <p>{stocksAvailable}</p>
      <h5>Order Status:</h5>
      <p>{isValid ? 'VALID' : 'INVALID'}</p>
    </div>
    </div>
    <Prompt
    when={halfFilled}
    message="Looks like you're in the middle of a trade. Are you sure you want to leave before completing it?" />

    </main>
  )
}


export default Trade
