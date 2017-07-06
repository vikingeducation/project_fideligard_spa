import React from 'react'
import Navigation from './Navigation'

const NotFound = (props) => {

  return (
    <section id="not-found">
    <Navigation history={props.history}/>
    <p>Sorry, we can't find the page you're looking for</p>
    </section>
  )
}

export default NotFound
