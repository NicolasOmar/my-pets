import React from 'react'
import { shape, bool, func, string, number } from 'prop-types'

const BasicInput = ({ config }) => (
  <input
    type={config.type}
    value={config.value || ''}
    placeholder={config.placeHolder || config.label}
    required={config.isRequired || false}
    onChange={evt => config.onInputChange(evt, config.control)}
    onBlur={() => config.onBlurChange(config.control)}
    name={config.label.toLowerCase().replace(' ', '-')}
    minLength={config.minLength || null}
    maxLength={config.maxLength || null}
  />
)

export default BasicInput

BasicInput.propTypes = {
  config: shape({
    type: string.isRequired,
    control: string.isRequired,
    value: string,
    placeHolder: string,
    onInputChange: func.isRequired,
    onBlurChange: func,
    isRequired: bool,
    minLength: number,
    maxLength: number,
    isValid: bool
  })
}
