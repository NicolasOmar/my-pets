import React from 'react'
import { arrayOf, shape, string, bool, func, element, array, oneOfType } from 'prop-types'
import NavBarItem from 'components/atoms/NavBarItem'

const NavBarDropdown = ({ label, options = [] }) => (
  <section data-testid={`navbar-dropdown`} className="navbar-item has-dropdown is-hoverable">
    <section data-testid={`navbar-dropdown-label`} className="navbar-item">
      {label}
    </section>
    <section data-testid={`navbar-dropdown`} className="navbar-dropdown">
      {options.map((option, i) => (
        <NavBarItem
          data-testid={`navbar-dropdown-item-${i}`}
          key={`navbar-dropdown-item-${i}`}
          {...option}
        />
      ))}
    </section>
  </section>
)

export default NavBarDropdown

NavBarDropdown.propTypes = {
  label: string.isRequired,
  options: arrayOf(
    shape({
      itemLabel: string,
      isLink: bool,
      onClickItem: func,
      children: oneOfType([element, array])
    })
  )
}
