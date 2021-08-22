import React from 'react'
import { shape, bool, func, string, number } from 'prop-types'
// COMPONENTS
import BasicInput from '../../atoms/basic-input'
// FUNCTIONS
import { parseInputClass } from '../../../functions/parsers'

const renderInputLabel = inputLabel => inputLabel && <label>{inputLabel}</label>

const FormInput = ({ inputLabel, inputConfig, isValid, isRequired }) => {
  const formInputClass = parseInputClass({ isValid, isRequired }, 'field')

  return (
    <div className={formInputClass}>
      {renderInputLabel(inputLabel)}
      <BasicInput {...inputConfig} />
    </div>
  )
}

export default FormInput

FormInput.propTypes = {
  inputLabel: string,
  inputConfig: shape({
    type: string.isRequired,
    control: string.isRequired,
    value: string,
    placeHolder: string,
    onInputChange: func,
    onBlurChange: func,
    isRequired: bool,
    minLength: number,
    maxLength: number
  }),
  isValid: bool,
  isRequired: bool
}
