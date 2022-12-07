import React from 'react'
import { bool, func, object, oneOf, string } from 'prop-types'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { buttonTypes } = TAG_TYPES
const { colors, sizes } = BULMA_STYLES

const BasicButton = ({
  type,
  label,
  isDisabled = false,
  styles = {},
  color = parseObjKeys(colors)[0],
  size = parseObjKeys(sizes)[1],
  isOutlined = false,
  isInverted = false,
  isLoading = false,
  onClick
}) => {
  const btnClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isOutlined, isInverted, isLoading },
    fieldName: 'button',
    otherClasses: [colors[color], sizes[size]]
  })

  return (
    <button
      key={`${type}-button-${color}`}
      data-testid={`test-${type}-button-${color}`}
      type={type}
      className={btnClasses}
      style={styles}
      disabled={isDisabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default BasicButton

BasicButton.propTypes = {
  // BASE PROPS
  type: oneOf(buttonTypes).isRequired,
  label: string.isRequired,
  isDisabled: bool,
  // STYLE PROPS
  styles: object,
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes)),
  isOutlined: bool,
  isInverted: bool,
  isLoading: bool,
  // FUNCTIONS
  onClick: func
}
