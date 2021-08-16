import React from 'react'
import { arrayOf, shape, string, func } from 'prop-types'
// ELEMENTS
import MenuItem from '../../elements/menu-item'

const getTestId = index => (index ? `menu-option-${index}` : 'menu-dropdown')

const MenuDropdown = ({ menuLabel, options }) => (
  <div className="ui simple dropdown item" data-testid={getTestId()}>
    {menuLabel}
    <i className="dropdown icon"></i>

    <div className="menu">
      {options.map((option, i) => (
        <MenuItem data-testid={`${getTestId(i)}`} key={`${getTestId(i)}`} {...option} />
      ))}
    </div>
  </div>
)

export default MenuDropdown

MenuDropdown.propTypes = {
  menuLabel: string.isRequired,
  options: arrayOf(
    shape({
      label: string.isRequired,
      onClick: func
    })
  ).isRequired
}
