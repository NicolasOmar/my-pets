import PropTypes from 'prop-types'

export const elementTypes = {
  /** `Attribute` ID used to locate the element in unit test suites (like Jest) */
  testId: PropTypes.string,
  /** `Attribute` Custom CSS classes, applicable for specific scenarios */
  cssClasses: PropTypes.string,
  /** `Styling` Custom styling applicable for specific scenarios */
  style: PropTypes.object
}

export const containerTypes = {
  /** `Attribute` *For container case*. ID used to locate the element in unit test suites (like Jest) */
  containerTestId: PropTypes.string,
  /** `Attribute` *For container case*. Custom CSS classes, applicable for specific scenarios */
  containerCssClasses: PropTypes.string,
  /** `Styling` *For container case*. Custom styling applicable for specific scenarios */
  containerStyle: PropTypes.object
}

export const componentTypes = {
  ...elementTypes,
  ...containerTypes
}
