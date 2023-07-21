import React from 'react'
import PropTypes from 'prop-types'
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
  type: PropTypes.oneOf(buttonTypes).isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  // STYLE PROPS
  styles: PropTypes.object,
  color: PropTypes.oneOf(Object.keys(colors)),
  size: PropTypes.oneOf(Object.keys(sizes)),
  isOutlined: PropTypes.bool,
  isInverted: PropTypes.bool,
  isLoading: PropTypes.bool,
  // FUNCTIONS
  onClick: PropTypes.func
}
