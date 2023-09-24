import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes } from '../../../types/commonTypes'
// OTHER COMPONENTS
import NavBarItem from '../../atoms/NavBarItem'

const NavBarDropdown = ({
  testId = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = null,
  label,
  options = []
}) => {
  const dropdownContainerTestId = containerTestId ?? 'test-navbar-dropdown-container'
  const dropdownTestId = testId ?? 'test-navbar-dropdown'
  const dropdownContainerClasses = containerCssClasses ?? 'navbar-item has-dropdown is-hoverable'

  return (
    <section
      data-testid={dropdownContainerTestId}
      className={dropdownContainerClasses}
      style={containerStyle}
    >
      <section data-testid={`${dropdownTestId}-label`} className="navbar-link">
        {label}
      </section>
      <section data-testid={`${dropdownTestId}-options`} className="navbar-dropdown is-right">
        {options?.map((option, i) => (
          <NavBarItem key={`navbar-dropdown-item-${i}`} {...option} />
        ))}
      </section>
    </section>
  )
}

export default NavBarDropdown

NavBarDropdown.propTypes = {
  ...complexPropTypes,
  /** `Required` `Attribute` Adds a label on top of the NavBar */
  label: PropTypes.string.isRequired,
  /** `Attribute` Sets the options that will be shown once user clicks on the dropdown */
  options: PropTypes.arrayOf(PropTypes.shape(NavBarItem.propTypes))
}
