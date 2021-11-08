import React from 'react'
import { string, bool, func, element, array, oneOfType } from 'prop-types'

const NavBarItem = ({
  itemLabel,
  isLink = false,
  onClickItem = () => console.warn(`onClick ${itemLabel}`),
  children = null
}) => {
  const itemStyle = isLink && !children ? 'navbar-link' : 'navbar-item'

  return (
    <div className={itemStyle} onClick={onClickItem}>
      {children || itemLabel}
    </div>
  )
}

export default NavBarItem

NavBarItem.propTypes = {
  itemLabel: string.isRequired,
  isLink: bool,
  onClickItem: func,
  children: oneOfType([element, array])
}
