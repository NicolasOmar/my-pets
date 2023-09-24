import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { colors, sizes } = BULMA_STYLES

const ProgressBar = ({
  testId = null,
  cssClasses = null,
  style = null,
  value = 0,
  maxValue = 100,
  isInfiniteLoading = false,
  color = parseObjKeys(colors)[7],
  size = parseObjKeys(sizes)[1]
}) => {
  const progressTestId =
    testId ?? isInfiniteLoading ? 'test-loading-progress-bar' : 'test-progress-bar'
  const progressClasses = parseFieldConfigToClasses({
    fieldName: 'progress',
    otherClasses: [colors[color], sizes[size], cssClasses]
  })

  return (
    <progress
      data-testid={progressTestId}
      value={isInfiniteLoading ? undefined : value}
      max={maxValue}
      className={progressClasses}
      style={style ?? undefined}
    >
      {isInfiniteLoading ? undefined : `${value}%`}
    </progress>
  )
}

export default ProgressBar

ProgressBar.propTypes = {
  ...elementPropTypes,
  /** `Attribute` Sets the value that will display completion percentage in its selected `color` */
  value: PropTypes.number,
  /** `Attribute` Sets a maximun numeric value that will display the whole bar in color */
  maxValue: PropTypes.number,
  /** `Styling` Sets an animation as infinite loading (will avoid to use the `value` prop) */
  isInfiniteLoading: PropTypes.bool,
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(parseObjKeys(colors)),
  /** `Styling` Sets a size based on Bulma's size options */
  size: PropTypes.oneOf(parseObjKeys(sizes))
}
