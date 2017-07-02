import React from 'react'

const StocksFilter = ({ onChange }) => {
  return (<form className="form-inline">
      <label htmlFor="filter" className="mr-2">Filter:</label>
      <input type="text" className="form-control" onChange={onChange}/>
      </form>)
}

export default StocksFilter
