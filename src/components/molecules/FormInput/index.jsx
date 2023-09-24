import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes } from '../../../types/commonTypes'
// COMPONENTS
import Label from '../../atoms/Label'
import BasicInput from '../../atoms/BasicInput'
import BasicSelect from '../../atoms/BasicSelect'
import RadioCheckGroup from '../RadioCheckGroup'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'
// FUNCTIONS
import { parseFieldConfigToClasses } from '../../../functions/parsers'

const { checkTypes, selectorTypes } = TAG_TYPES

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

const FormInput = ({
  testId = null,
  cssClasses = null,
  style = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = null,
  inputLabel = null,
  isLoading = false,
  inputConfig
}) => {
  const formInputContainerTestId = containerTestId ?? 'test-conatiner-field'
  const formInputTestId = testId ?? 'test-field'
  const formInputContainerClasses = containerCssClasses ?? 'field'
  const formInputClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isLoading },
    fieldName: 'control',
    otherClasses: [cssClasses]
  })

  return (
    <section
      key={`field-${inputConfig.type}-${inputConfig.control}`}
      data-testid={`${formInputContainerTestId}-${inputConfig.type}-${inputConfig.control}`}
      className={formInputContainerClasses}
      style={containerStyle ?? undefined}
    >
      {inputLabel && <Label labelText={inputLabel} isRequired={inputConfig.isRequired} />}
      <section
        data-testid={`${formInputTestId}-${inputConfig.type}-${inputConfig.control}`}
        className={formInputClasses}
        style={style ?? undefined}
      >
        {parseFormInput(inputConfig)}
      </section>
    </section>
  )
}

export default FormInput

FormInput.propTypes = {
  ...complexPropTypes,
  /** `Attribute` Adds a label on top of the input */
  inputLabel: PropTypes.string,
  /** `Attribute` Adds a spinner on the input */
  isLoading: PropTypes.bool,
  /** `Required` `Attribute` Configuration for the input, functions included */
  inputConfig: PropTypes.oneOfType([
    PropTypes.shape(BasicInput.propTypes),
    PropTypes.shape(RadioCheckGroup.propTypes),
    PropTypes.shape(BasicSelect.propTypes)
  ]).isRequired
}
