import React from 'react'
import { shape, bool, func, string, number } from 'prop-types'
// FUNCTIONS
import { parseInputClass } from '../../../functions/parsers'

const FormInput = ({ config }) => {
  const inputClass = parseInputClass(config, 'field')

  return (
    <div className={inputClass}>
      <label>{config.label}</label>
      <input
        type={config.type}
        value={config.value || ''}
        required={config.isRequired || false}
        onChange={evt => config.onInputChange(evt, config.control)}
        onBlur={() => config.onBlurChange(config.control)}
        name={config.label.toLowerCase().replace(' ', '-')}
        minLength={config.min || null}
        maxLength={config.max || null}
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
    min: number,
    max: number,
    isValid: bool
  })
}
