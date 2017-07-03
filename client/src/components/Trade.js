import React from 'react'
import Navigation from './Navigation'


const Trade = (props) => {

  let { onSubmit, minDate, maxDate, symbols, stock, updateSymbol, price, currentDate, quantity, updateQuantity, balance } = props
  symbols = symbols
  let symbolOptions = symbols.map((symbol) => {
    return <option value={symbol} key={symbol}>{symbol}</option>
  })

  const cost = (price * quantity).toFixed(2)


  return (
    <section id="trade">
    <h3>Trade</h3>
  <Navigation history={props.history}/>
    <div className="row">
    <div className="col-md-6">
     <form onSubmit={onSubmit}>
      <div className="row">
        <label htmlFor="symbol" className="col-form-label col-md-3">Symbol</label>
      <div className="col-md-9">
          <select value={stock} className="form-control" onChange={updateSymbol} name="symbol">
        {symbolOptions}
        </select>
      </div>
      </div>
      <div className="row">
        <label htmlFor="type" className="col-fom-label col-md-3">Buy/Sell</label>
       <div className="col-md-9">
          <select name="type" className="form-control">
         <option value="BUY">Buy</option>
         <option value="SELL">Sell</option>
         </select>
       </div>
      </div>
     <div className="row">
        <label htmlFor="quantity"  className="col-fom-label col-md-3">Quantity</label>
      <div className="col-md-9">
         <input type="quantity" min="1" className="form-control" name="quantity" onChange={updateQuantity} value={quantity}/>
      </div>
     </div>
     <div className="row"> <label htmlFor="date"  className="col-fom-label col-md-3">Date</label>
       <div className="col">
         <input type="date" min={minDate} max={maxDate} className="form-control" name="date" value={currentDate}/>
       </div>
       </div>
      <div className="row"> 
      <label htmlFor="price"  className="col-fom-label col-md-3">Price</label>
       <div className="col"> <input type="number" disabled className="form-control" value={`${price}`} name="price" /> </div>
        </div>
     <div className="row">
        <label htmlFor="cost"  className="col-fom-label col-md-3">Cost</label>
      <div className="col">
         <input type="text" disabled className="form-control" value={cost}/>
      </div>
     </div>
      <button type="submit" className="btn btn-primary">Place Order</button>
    </form>
    </div>
    <div className="col-md-6">
    <h5>Cash Available:</h5>
<p>${balance.toFixed(2)}</p>
<h5>Order Status:</h5>
<p>{balance > cost ? 'VALID' : 'INVALID'}</p>
    </div>
    </div>
   
    </section>
  )
}

export default Trade
