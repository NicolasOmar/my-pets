import React from 'react'
import { shape, bool, func, string } from 'prop-types'

const FormInput = ({ config }) => {
  const inputClass = `field ${config.isValid ? '' : 'error'}`

  return (
    <div className={inputClass}>
      <label>{config.label}</label>
      <input
        type={config.type}
        value={config.value || ''}
        required={config.isRequired || false}
        onChange={evt => config.onInputChange(evt, config.control)}
        onBlur={() => config.onBlurChange(config.control)}
        name="first-name"
        placeholder={config.label}
      />
    </div>
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
    isRequired: bool,
    isValid: bool
  })
}
