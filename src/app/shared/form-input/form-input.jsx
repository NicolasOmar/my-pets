import React from 'react'
import PropTypes, { bool, func, string } from 'prop-types'
import { Form } from 'semantic-ui-react'

const FormInput = ({ config }) => {
  return (
    <Form.Input
      label={config.label}
      type={config.type}
      value={config.value || ''}
      onChange={(evt) => config.onInputChange(evt, config.control)}
      onBlur={() => config.onBlurChange(config.type)}
      error={!config.valid || false}
    />
  )
}

export default FormInput

FormInput.propTypes = {
  config: PropTypes.shape({
    label: string.isRequired,
    type: string.isRequired,
    control: string.isRequired,
    value: string,
    onInputChange: func.isRequired,
    onBlurChange: func,
    valid: bool,
  }),
}
