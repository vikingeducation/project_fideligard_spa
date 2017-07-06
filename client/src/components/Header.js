import React from 'react'
import Navigation from './Navigation'

const Header = ({ history, title, children }) => {

  return (
    <header className="mb-3">
  <h2 className="inline-block">{title}</h2>
  <Navigation history={history} />
  {children}
  </header>
  )
}

export default Header
