import React from 'react'
import { shape, bool, func, string, number } from 'prop-types'
// COMPONENTS
import BasicInput from '../../elements/basic-input'
// FUNCTIONS
import { parseInputClass } from '../../../functions/parsers'

const FormInput = ({ inputLabel, inputConfig }) => {
  const inputClass = parseInputClass(inputConfig, 'field')

  return (
    <div className={inputClass}>
      <label>{inputLabel}</label>
      <BasicInput config={inputConfig} />
    </div>
  )
}

export default FormInput

FormInput.propTypes = {
  inputLabel: string,
  inputConfig: shape({
    label: string.isRequired,
    placeHolder: string,
    type: string.isRequired,
    control: string.isRequired,
    value: string,
    onInputChange: func.isRequired,
    onBlurChange: func,
    isRequired: bool,
    minLength: number,
    maxLength: number,
    isValid: bool
  })
}
