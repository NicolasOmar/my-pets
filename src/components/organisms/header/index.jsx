import React from 'react'
import { shape, string, func, arrayOf } from 'prop-types'
// COMPONENTS
import MenuDropdown from '../../molecules/menu-dropdown'
// STYLES
import './index.scss'

const Header = ({ dropdownConfig }) => (
  <div className="ui secondary pointing menu">
    {/* <a className="active item">Test One</a>
    <a className="item">Test Two</a>
    <a className="item">Test Three</a> */}

    <div className="right menu">
      <MenuDropdown {...dropdownConfig} />
    </div>
  </div>
)

export default Header

Header.propTypes = {
  dropdownConfig: shape({
    menuLabel: string.isRequired,
    options: arrayOf(
      shape({
        label: string.isRequired,
        onClick: func
      })
    ).isRequired
  })
}
