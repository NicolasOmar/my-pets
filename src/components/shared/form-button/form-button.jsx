import React from 'react'
import { bool, func, oneOf, shape, string } from 'prop-types'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/buttons.enum'

const FormButton = ({ config }) => {
  const btnClass = `ui button ${config.color || 'grey'}`

  return (
    <button
      type={config.type}
      className={btnClass}
      disabled={config.isDisabled || false}
      onClick={config.onClick}
    >
      {config.label}
    </button>
  )
}

export default FormButton

FormButton.propTypes = {
  config: shape({
    type: oneOf(buttonTypeEnums).isRequired,
    isBasic: bool,
    color: oneOf(buttonColorEnums),
    isRequired: bool,
    isDisabled: bool,
    onClick: func,
    label: string.isRequired
  })
}
