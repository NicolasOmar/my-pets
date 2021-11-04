import React from 'react'
import { bool, func, oneOf, string } from 'prop-types'
// ENUMS
import { buttonTypeEnums } from '../../../enums/type.enums.json'
import { colorEnums, sizeEnums } from '../../../enums/styles.enums.json'
// FUNCTIONS
import { parseCssClasses } from '../../../functions/parsers'

const BasicButton = ({
  type,
  color = colorEnums[0],
  size = sizeEnums[0],
  isOutlined = false,
  isInverted = false,
  isLoading = false,
  isDisabled = false,
  onClick,
  label
}) => {
  const btnClass = parseCssClasses({ isOutlined, isInverted, isLoading }, 'button', [color, size])

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
  type: oneOf(buttonTypeEnums).isRequired,
  color: oneOf(colorEnums),
  size: oneOf(sizeEnums),
  isOutlined: bool,
  isInverted: bool,
  isLoading: bool,
  isDisabled: bool,
  onClick: func,
  label: string.isRequired
}
