import React from 'react';
import '../index.css'

const Trade = () => {
  return (
    <div>
      <h3>Trade</h3>
      <div id='leftcontent'>
        
        <p>Symbol: </p>
        <p>Buy/Sell: </p>
        <p>Quantity: </p>
        <p>Date: </p>
        <p>Price: </p>
        <p>Cost: </p>
        <button>Place Order!</button>
      </div>
      <div id='rightcontent'>
        <p> Cash Available: </p>
        <br />
        <p> Order Status: </p>
      </div>
    </div>
  )
}


export default Trade;