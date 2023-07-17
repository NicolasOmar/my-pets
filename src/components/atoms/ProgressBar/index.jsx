import React from 'react'
// CONSTANTS
import PropTypes from 'prop-types'
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { colors, sizes } = BULMA_STYLES

const ProgressBar = ({
  value = 0,
  maxValue = 100,
  isInfiniteLoading = false,
  color = parseObjKeys(colors)[7],
  size = parseObjKeys(sizes)[1]
}) => {
  const progressClasses = parseFieldConfigToClasses({
    fieldName: 'progress',
    otherClasses: [colors[color], sizes[size]]
  })

  return isInfiniteLoading ? (
    <progress
      data-testid="test-loading-progress-bar"
      className={progressClasses}
      max={maxValue}
    ></progress>
  ) : (
    <progress
      data-testid="test-progress-bar"
      className={progressClasses}
      value={value}
      max={maxValue}
    >
      {`${value}%`}
    </progress>
  )
}

export default ProgressBar

ProgressBar.propTypes = {
  // BASE PROPS
  value: PropTypes.number,
  maxValue: PropTypes.number,
  isInfiniteLoading: PropTypes.bool,
  // STYLE PROPS
  color: PropTypes.oneOf(parseObjKeys(colors)),
  size: PropTypes.oneOf(parseObjKeys(sizes))
}
