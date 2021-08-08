import React from 'react'
import { bool, func, oneOf, shape, string } from 'prop-types'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/buttons.enum.json'

const BasicButton = ({ config }) => {
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

export default BasicButton

BasicButton.propTypes = {
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
