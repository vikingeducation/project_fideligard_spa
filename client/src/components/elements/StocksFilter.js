import React from 'react'
import Form from '../Form'
import Input from './Input'
import InputGroup from './InputGroup'

const StocksFilter = ({ onChange }) => {
  return (<Form inline={true} classes="float-right">
    <InputGroup name="filter" classes="mr-2" text="Filter:">
          <Input type="text" onChange={onChange}/>
    </InputGroup>
      </Form>)
}

export default StocksFilter
