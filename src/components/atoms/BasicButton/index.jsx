import React from 'react'
import { bool, func, oneOf, string } from 'prop-types'
// CONSTANTS
import { buttonTypes } from 'constants/tag-types.json'
import { colors, sizes } from 'constants/bulma-styles.json'
// FUNCTIONS
import { parseCssClasses, parseObjKeys } from 'functions/parsers'

const BasicButton = ({
  type,
  color = parseObjKeys(colors)[0],
  size = parseObjKeys(sizes)[0],
  isOutlined = false,
  isInverted = false,
  isLoading = false,
  isDisabled = false,
  onClick,
  label
}) => {
  const btnClass = parseCssClasses({ isOutlined, isInverted, isLoading }, 'button', [
    colors[color],
    sizes[size]
  ])

  return (
    <button
      data-testid={`${type}-${btnClass.replace(' ', '-')}`}
      type={type}
      className={btnClass}
      disabled={isDisabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default BasicButton

BasicButton.propTypes = {
  type: oneOf(buttonTypes).isRequired,
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes)),
  isOutlined: bool,
  isInverted: bool,
  isLoading: bool,
  isDisabled: bool,
  onClick: func,
  label: string.isRequired
}
