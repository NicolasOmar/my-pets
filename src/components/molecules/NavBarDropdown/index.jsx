import React from 'react'
import { arrayOf, object, shape, string } from 'prop-types'
import NavBarItem from '../../atoms/NavBarItem'

const NavBarDropdown = ({ label, options = [], styles = {} }) => (
  <section
    data-testid={`test-navbar-dropdown`}
    className="navbar-item has-dropdown is-hoverable"
    style={styles}
  >
    <section data-testid={`test-navbar-dropdown-label`} className="navbar-link">
      {label}
    </section>
    <section data-testid={`test-navbar-dropdown-options`} className="navbar-dropdown is-right">
      {options?.map((option, i) => (
        <NavBarItem key={`navbar-dropdown-item-${i}`} {...option} />
      ))}
    </section>
  </section>
)

export default NavBarDropdown

NavBarDropdown.propTypes = {
  label: string.isRequired,
  options: arrayOf(shape(NavBarItem.propTypes)),
  styles: object
}
