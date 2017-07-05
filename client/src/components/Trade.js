import React from 'react'
import Header from './Header'
import Form from './Form'
import Select from './elements/Select'
import InputGroup from './elements/InputGroup'
import Input from './elements/Input'
import { Prompt } from 'react-router-dom'
import { numDisplay } from '../helpers/helpers'


const Trade = ({ history, onSubmit, minDate, maxDate, symbols, stock, updateSymbol, price, currentDate, quantity, updateQuantity, balance, updateCurrentDate, halfFilled, updateFormStatus, portfolio, setType, type }) => {

  const cost = numDisplay(price * quantity)

  let enoughFunds = balance >= (price * quantity)
  let stocksAvailable = portfolio[stock] ? portfolio[stock].quantity : 0
  let enoughStocks = stocksAvailable >= quantity
  let isValid = (enoughFunds && type === 'BUY') || (enoughStocks && type === 'SELL')


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
     <InputGroup name="symbol" text="Symbol">
     <Select value={stock} className="form-control" onChange={ updateSymbol} name="symbol" options={symbols} />
     </InputGroup>
      <InputGroup name="type" text="Buy/Sell">
      <Select name="type" value={type} onChange={setType}>
       <option value="BUY">Buy</option>
         <option value="SELL">Sell</option>
      </Select>
      </InputGroup>
      <InputGroup name="quantity" text="Quantity">
      <Input type="number" min="1" className="form-control" name="quantity" onChange={updateQuantity} placeholder={0}/>
      </InputGroup>
      <InputGroup name="date" text="Date">
         <Input type="date" min={minDate} max={maxDate} className="form-control" name="date" value={currentDate} onChange={updateCurrentDate}/>
      </InputGroup>
      <InputGroup name="price" text="Price ($)">
        <Input type="number" disabled className="form-control" value={`${price ? price.toFixed(2) : '-'}`} name="price" />
      </InputGroup>
      <InputGroup name="cost" text="Cost ($)">
      <Input type="text" disabled className="form-control" value={cost}/>
      </InputGroup>
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
