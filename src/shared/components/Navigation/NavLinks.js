import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

const NavLinks = props => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          CREATE
        </NavLink>
      </li>
      <li>
        <NavLink to={'/pickup'}>PICKUP</NavLink>
      </li>
    </ul>
  )
}

export default NavLinks
