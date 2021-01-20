import React from 'react'
import { bool, func, oneOf, shape, string } from 'prop-types'
import { Form } from 'semantic-ui-react'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/buttons.enum'

const FormInput = ({ config }) => {
  return (
    <Form.Button
      type={config.type}
      basic={config.isBasic || false}
      color={config.color || 'grey'}
      required={config.isRequired || false}
      disabled={config.isDisabled || false}
      onClick={config.onClick}
    >
      {config.label}
    </Form.Button>
  )
}

export default FormInput

FormInput.propTypes = {
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
