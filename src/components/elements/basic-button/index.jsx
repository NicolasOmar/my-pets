import React from 'react'
import { bool, func, oneOf, string } from 'prop-types'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/buttons.enum.json'

const BasicButton = ({ type, color, isDisabled, onClick, label }) => {
  const btnClass = `ui button ${color || 'grey'}`

  return (
    <button type={type} className={btnClass} disabled={isDisabled || false} onClick={onClick}>
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
