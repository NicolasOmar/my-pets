import PropTypes from 'prop-types'

export const elementPropTypes = {
  /** `Attribute` ID used to locate the element in unit test suites (like Jest) */
  testId: PropTypes.string,
  /** `Attribute` Custom CSS classes, applicable for specific scenarios */
  cssClasses: PropTypes.string,
  /** `Styling` Custom styling applicable for specific scenarios */
  style: PropTypes.object
}

export const containerPropTypes = {
  /** `Attribute` *For container case*. ID used to locate the element in unit test suites (like Jest) */
  containerTestId: PropTypes.string,
  /** `Attribute` *For container case*. Custom CSS classes, applicable for specific scenarios */
  containerCssClasses: PropTypes.string,
  /** `Styling` *For container case*. Custom styling applicable for specific scenarios */
  containerStyle: PropTypes.object
}

export const clickeablePropTypes = {
  /** `Function` Sends a click signal to its parent component when user clicks on the select */
  onClick: PropTypes.func
}

export const complexPropTypes = {
  ...elementPropTypes,
  ...containerPropTypes
}
