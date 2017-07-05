import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ title }) => {

  return (
    <nav className="navbar navbar-light bg-faded mb-2">
  <h1 className="h1"><Link to="/">{title}</Link></h1>
  </nav>
  )
}

export default Navbar
