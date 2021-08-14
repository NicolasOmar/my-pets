import React from 'react'
import { bool, func, oneOf, string } from 'prop-types'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/button.enums.json'

const BasicButton = ({ type, color, isDisabled, onClick, label }) => {
  const btnClass = `ui button ${color}`

  return (
    <button
      data-testid={btnClass}
      type={type}
      className={btnClass}
      disabled={isDisabled || false}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default BasicButton

BasicButton.propTypes = {
  type: oneOf(buttonTypeEnums).isRequired,
  color: oneOf(buttonColorEnums),
  isDisabled: bool,
  onClick: func,
  label: string.isRequired
}
