import React from 'react'
// CONSTANTS
import { bool, number, oneOf } from 'prop-types'
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { colors, sizes } = BULMA_STYLES

const ProgressBar = ({
  value = 0,
  maxValue = 100,
  isLoading = false,
  color = parseObjKeys(colors)[7],
  size = parseObjKeys(sizes)[1]
}) => {
  const progressClasses = parseFieldConfigToClasses({
    fieldName: 'progress',
    otherClasses: [colors[color], sizes[size]]
  })

  return isLoading ? (
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
  value: number,
  maxValue: number,
  isLoading: bool,
  // STYLE PROPS
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes))
}
