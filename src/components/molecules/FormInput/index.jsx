import React from 'react'
import { bool, string, oneOfType, shape, object } from 'prop-types'
// COMPONENTS
import Label from '../../atoms/Label'
import BasicInput from '../../atoms/BasicInput'
import BasicSelect from '../../atoms/BasicSelect'
// CONSTANTS
import { checkTypes, selectorTypes } from '../../../constants/tag-types.json'
// FUNCTIONS
import { parseConfigToClassName } from '../../../functions/parsers'
import RadioCheckGroup from '../RadioCheckGroup'

const parseFormInput = inputConfig => {
  const baseInputConfig = { ...inputConfig, color: inputConfig.isValid === false ? 'danger' : null }

  return checkTypes.includes(inputConfig.type) ? (
    <RadioCheckGroup
      {...{
        ...inputConfig,
        options: inputConfig.options.map(_option => ({
          ..._option,
          type: inputConfig.type
        }))
      }}
    />
  ) : selectorTypes.includes(inputConfig.type) ? (
    <BasicSelect {...baseInputConfig} />
  ) : (
    <BasicInput {...baseInputConfig} />
  )
}

const FormInput = ({ inputLabel = null, isLoading = false, inputConfig, styles = {} }) => {
  const controlClass = parseConfigToClassName({ isLoading }, 'control')

  return (
    <section
      key={`field-${inputConfig.type}-${inputConfig.control}`}
      data-testid={`test-field-${inputConfig.type}-${inputConfig.control}`}
      className="field"
      style={styles}
    >
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
    shape(RadioCheckGroup.propTypes),
    shape(BasicSelect.propTypes)
  ]).isRequired,
  styles: object
}
