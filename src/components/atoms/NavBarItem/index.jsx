import React from 'react'
import { string, bool, func, element, array, oneOfType } from 'prop-types'

const NavBarItem = ({ itemLabel = null, isLink = false, onClickItem, children = null }) => {
  const itemStyle = isLink && !children ? 'navbar-link' : 'navbar-item'

  return (
    <div data-testid={`navbar-item`} className={itemStyle} onClick={onClickItem}>
      {children || itemLabel}
    </div>
  )
}

export default NavBarItem

NavBarItem.propTypes = {
  itemLabel: string,
  isLink: bool,
  onClickItem: func,
  children: oneOfType([element, array])
}
