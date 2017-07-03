import React from 'react'
import { connect } from 'react-redux'



const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Success = () => {

  return (

    <section id="success">
      <h2>Success</h2>
      transaction summary
      balance info
   </section>

  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Success)
