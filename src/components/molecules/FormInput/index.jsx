import React from 'react'
import { bool, string, oneOfType, shape } from 'prop-types'
// COMPONENTS
import Label from '../../atoms/Label'
import BasicInput from '../../atoms/BasicInput'
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
import BasicSelect from '../../atoms/BasicSelect'
// CONSTANTS
import { checkTypes, selectorTypes } from '../../../constants/tag-types.json'
// FUNCTIONS
import { parseCssClasses } from '../../../functions/parsers'
import RadioCheckGroup from '../RadioCheckGroup'

const parseFormInput = inputConfig => {
  const baseInputConfig = { ...inputConfig, color: inputConfig.isValid === false ? 'danger' : null }

  return checkTypes.includes(inputConfig.type) ? (
    <RadioCheckGroup
      {...{
        ...inputConfig,
        options: inputConfig.options.map(_option => ({
          ..._option,
          onInputChange: inputConfig.onInputChange,
          onBlurChange: inputConfig.onBlurChange
        }))
      }}
    />
  ) : selectorTypes.includes(inputConfig.type) ? (
    <BasicSelect {...baseInputConfig} />
  ) : (
    <BasicInput {...baseInputConfig} />
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
  inputConfig: oneOfType([
    shape(BasicInput.propTypes),
    shape(BasicRadioCheck.propTypes),
    shape(BasicSelect.propTypes)
  ]).isRequired
}
