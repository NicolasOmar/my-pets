
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'

const NavBarItem = ({
  testId = null,
  cssClasses = null,
  style = null,
  children = null,
  itemLabel = null,
  isLink = false,
  onClickItem
}) => {
  const navBarItemStyling = isLink && !children ? 'navbar-link' : 'navbar-item'
  const navBarTestId = testId ?? `test-${navBarItemStyling}`
  const navBarClasses = cssClasses ? `${navBarItemStyling} ${cssClasses}` : navBarItemStyling

  return (
    <section
      key={`${navBarItemStyling}`}
      data-testid={navBarTestId}
      className={navBarClasses}
      style={style ?? undefined}
      onClick={onClickItem}
    >
      {children || itemLabel}
    </section>
  )
}

export default NavBarItem

NavBarItem.propTypes = {
  ...elementPropTypes,
  /** `Attribute` Indicates which components (could be 1 or more) container in the NavBar */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  /** `Attribute` In case of not use a child, the item will show a string label */
  itemLabel: PropTypes.string,
  /** `Styling` Set the item style as a links instead a common item */
  isLink: PropTypes.bool,
  /** `Function` Sends a click signal to its parent component when user clicks on the button */
  onClickItem: PropTypes.func
}
