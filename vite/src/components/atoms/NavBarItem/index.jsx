import React from 'react'
import { string, bool, func, element, array, oneOfType, object } from 'prop-types'

const NavBarItem = ({
  children = null,
  itemLabel = null,
  isLink = false,
  styles = {},
  onClickItem
}) => {
  const itemStyle = isLink && !children ? 'navbar-link' : 'navbar-item'

  return (
    <section
      key={`${itemStyle}`}
      data-testid={`test-${itemStyle}`}
      className={itemStyle}
      style={styles}
      onClick={onClickItem}
    >
      {children || itemLabel}
    </section>
  )
}

export default NavBarItem

NavBarItem.propTypes = {
  children: oneOfType([element, array]),
  itemLabel: string,
  // STYLE PROPS
  isLink: bool,
  styles: object,
  // FUNCTIONS
  onClickItem: func
}
