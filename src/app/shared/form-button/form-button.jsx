import React from 'react'
import PropTypes, { bool, func, oneOf, string } from 'prop-types'
import { Form } from 'semantic-ui-react'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/buttons.enum'

const FormInput = ({ config }) => {
  return (
    <Form.Button
      type={config.type}
      basic={config.isBasic || false}
      color={config.color}
      onClick={config.onClick}
    >
      {config.label}
    </Form.Button>
  )
}

export default FormInput

FormInput.propTypes = {
  config: PropTypes.shape({
    type: oneOf(buttonTypeEnums),
    isBasic: bool,
    color: oneOf(buttonColorEnums),
    label: string.isRequired,
    onClick: func,
  }),
}
