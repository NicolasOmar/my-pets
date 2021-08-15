import React from 'react'
import { arrayOf, shape, string, func } from 'prop-types'
// ELEMENTS
import MenuItem from '../../elements/menu-item'

const MenuDropdown = ({ menuLabel, options }) => (
  <div className="ui simple dropdown item">
    {menuLabel}
    <i className="dropdown icon"></i>

    <div className="menu">
      {options.map((option, i) => (
        <MenuItem key={`option-${i}`} {...option} />
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
  )
}
