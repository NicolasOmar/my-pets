import React from 'react'
import { shape, bool, func, string, number } from 'prop-types'
// COMPONENTS
import BasicInput from '../../atoms/basic-input'
// FUNCTIONS
import { parseCssClasses } from '../../../functions/parsers'

const renderInputLabel = inputLabel => inputLabel && <label>{inputLabel}</label>

const FormInput = ({ inputLabel, inputConfig }) => {
  const formInputClass = parseCssClasses(
    {
      isValid: inputConfig.isValid,
      isRequired: inputConfig.isRequired
    },
    'field'
  )

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
    isValid: bool,
    minLength: number,
    maxLength: number
  })
}
