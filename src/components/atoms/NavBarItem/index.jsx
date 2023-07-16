import React from 'react'
import PropTypes from 'prop-types'

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
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  itemLabel: PropTypes.string,
  // STYLE PROPS
  isLink: PropTypes.bool,
  styles: PropTypes.object,
  // FUNCTIONS
  onClickItem: PropTypes.func
}
