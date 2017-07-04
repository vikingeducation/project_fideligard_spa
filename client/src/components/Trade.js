import React from 'react'
import Navigation from './Navigation'
import Form from './Form'
import Select from './elements/Select'
import InputGroup from './elements/InputGroup'
import Input from './elements/Input'
import { Prompt } from 'react-router-dom'


const Trade = (props) => {

  let { onSubmit, minDate, maxDate, symbols, stock, updateSymbol, price, currentDate, quantity, updateQuantity, balance, updateCurrentDate, halfFilled, updateFormStatus } = props

  const cost = (price && quantity) ? (price * quantity).toFixed(2) : ''

  return (
    <section id="trade">
    <h3 className="inline-block">Trade</h3>
  <Navigation history={props.history}/>
    <div className="row">
    <div className="col-md-6">
     <Form onSubmit={onSubmit}>
     <InputGroup name="symbol" text="Symbol">
     <Select value={stock} className="form-control" onChange={ updateSymbol} name="symbol" options={symbols} />
     </InputGroup>
      <InputGroup name="type" text="Buy/Sell">
      <Select name="type">
       <option value="BUY">Buy</option>
         <option value="SELL">Sell</option>
      </Select>
      </InputGroup>
      <InputGroup name="quantity" text="Quantity">
      <Input type="quantity" min="1" className="form-control" name="quantity" onChange={updateQuantity} placeholder={0}/>
      </InputGroup>
      <InputGroup name="date" text="Date">
         <Input type="date" min={minDate} max={maxDate} className="form-control" name="date" value={currentDate} onChange={updateCurrentDate}/>
      </InputGroup>
      <InputGroup name="price" text="Price ($)">
        <Input type="number" disabled className="form-control" value={`${price}`} name="price" />
      </InputGroup>
      <InputGroup name="cost" text="Cost ($)">
      <Input type="text" disabled className="form-control" value={cost}/>
      </InputGroup>
      <button type="submit" className="btn btn-primary" onClick={updateFormStatus}>Place Order</button>
    </Form>
    </div>
    <div className="col-md-6">
    <h5>Cash Available:</h5>
      <p>${balance.toFixed(2)}</p>
      <h5>Order Status:</h5>
      <p>{balance > cost ? 'VALID' : 'INVALID'}</p>
    </div>
    </div>
    <Prompt
    when={halfFilled}
    message="Looks like you're in the middle of a trade. Are you sure you want to leave before completing it?" />

    </section>
  )
}


export default Trade
