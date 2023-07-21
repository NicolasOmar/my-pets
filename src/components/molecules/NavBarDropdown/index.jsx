import React from 'react'
import PropTypes from 'prop-types'
// OTHER COMPONENTS
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
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape(NavBarItem.propTypes)
  ),
  styles: PropTypes.object
}
