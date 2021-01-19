import React from 'react'
import { shape, bool, func, string } from 'prop-types'
import { Form } from 'semantic-ui-react'

const FormInput = ({ config }) => {
  return (
    <Form.Input
      label={config.label}
      type={config.type}
      value={config.value || ''}
      required={config.isRequired || false}
      onChange={(evt) => config.onInputChange(evt, config.control)}
      onBlur={() => config.onBlurChange(config.control)}
      error={!config.valid || false}
    />
  )
}

export default FormInput

FormInput.propTypes = {
  config: shape({
    label: string.isRequired,
    type: string.isRequired,
    control: string.isRequired,
    value: string,
    onInputChange: func.isRequired,
    onBlurChange: func,
    valid: bool,
  }),
}
