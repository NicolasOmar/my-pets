import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import NavBarItem from '../../atoms/NavBarItem'

const NavBarDropdown = ({ label, options = [] }) => (
  <section data-testid={`navbar-dropdown`} className="navbar-item has-dropdown is-hoverable">
    <section data-testid={`navbar-dropdown-label`} className="navbar-link">
      {label}
    </section>
    <section data-testid={`navbar-dropdown-options`} className="navbar-dropdown is-right">
      {options?.map((option, i) => (
        <NavBarItem key={`navbar-dropdown-item-${i}`} {...option} />
      ))}
    </section>
  </section>
)

export default NavBarDropdown

NavBarDropdown.propTypes = {
  label: string.isRequired,
  options: arrayOf(shape(NavBarItem.propTypes))
}
