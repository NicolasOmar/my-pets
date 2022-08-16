import React from 'react'
import { bool, func, object, oneOf, string } from 'prop-types'
// CONSTANTS
import { buttonTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseCssClasses, parseObjKeys } from '../../../functions/parsers'

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
  const btnClass = parseCssClasses({ isOutlined, isInverted, isLoading }, 'button', [
    colors[color],
    sizes[size]
  ])

  return (
    <button
      key={`${type}-button-${color}`}
      data-testid={`test-${type}-button-${color}`}
      type={type}
      className={btnClass}
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
