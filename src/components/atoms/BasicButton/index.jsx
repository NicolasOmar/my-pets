import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { elementTypes } from '../../../types/commonTypes'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { buttonTypes } = TAG_TYPES
const { colors, sizes } = BULMA_STYLES

const BasicButton = ({
  testId = null,
  cssClasses = null,
  style = null,
  type,
  label,
  isDisabled = false,
  color = parseObjKeys(colors)[0],
  size = parseObjKeys(sizes)[1],
  isOutlined = false,
  isInverted = false,
  isLoading = false,
  onClick
}) => {
  const buttonClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isOutlined, isInverted, isLoading },
    fieldName: 'button',
    otherClasses: [colors[color], sizes[size], cssClasses]
  })
  const buttonTestId = testId ?? `test-${type}-button-${color}`

  return (
    <button
      key={`${type}-button-${color}`}
      data-testid={buttonTestId}
      type={type}
      className={buttonClasses}
      style={style ?? undefined}
      disabled={isDisabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default BasicButton

BasicButton.propTypes = {
  ...elementTypes,
  /** `Attribute` `Required` Button's type you will use */
  type: PropTypes.oneOf(buttonTypes).isRequired,
  /** `Attribute` `Required` Button's text that will be shown */
  label: PropTypes.string.isRequired,
  /** `Attribute` Makes the button unable to be clicked */
  isDisabled: PropTypes.bool,
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(Object.keys(colors)),
  /** `Styling` Sets a size based on Bulma's size options */
  size: PropTypes.oneOf(Object.keys(sizes)),
  /** `Styling` Exchange button's main color in the one on its text and border */
  isOutlined: PropTypes.bool,
  /** `Styling` Exchange button's main color in the one on its text and border */
  isInverted: PropTypes.bool,
  /** `Styling` Changes button's text with a spinner animation */
  isLoading: PropTypes.bool,
  /** `Function` Sends a click signal to its parent component when user clicks on the button */
  onClick: PropTypes.func
}
