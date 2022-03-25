import React from 'react'
import { bool, string, oneOfType } from 'prop-types'
// COMPONENTS
import Label from '../../atoms/Label'
import BasicInput from '../../atoms/BasicInput'
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
import BasicSelect from '../../atoms/BasicSelect'
// CONSTANTS
import { checkTypes, selectorTypes } from '../../../constants/tag-types.json'
// FUNCTIONS
import { parseCssClasses } from '../../../functions/parsers'

const parseFormInput = inputConfig => {
  const config = { ...inputConfig, color: inputConfig.isValid === false ? 'danger' : null }
  return checkTypes.includes(inputConfig.type) ? (
    <BasicRadioCheck {...config} />
  ) : selectorTypes.includes(inputConfig.type) ? (
    <BasicSelect {...config} />
  ) : (
    <BasicInput {...config} />
  )
}

const FormInput = ({ inputLabel = null, isLoading = false, inputConfig }) => {
  const controlClass = parseCssClasses({ isLoading }, 'control')
  return (
    <section className="field">
      <Label labelText={inputLabel} isRequired={inputConfig.isRequired} />
      <section className={controlClass}>{parseFormInput(inputConfig)}</section>
    </section>
  )
}

export default FormInput

FormInput.propTypes = {
  inputLabel: string,
  isLoading: bool,
  inputConfig: oneOfType([BasicInput.propTypes, BasicRadioCheck.propTypes, BasicSelect.propTypes])
    .isRequired
}
