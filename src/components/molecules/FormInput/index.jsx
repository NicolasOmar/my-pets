import React from 'react'
import { shape, bool, func, string, number, oneOf } from 'prop-types'
// COMPONENTS
import Label from '../../atoms/Label'
import BasicInput from '../../atoms/BasicInput'
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
import BasicSelect from '../../atoms/BasicSelect'
// CONSTANTS
import { inputTypes, checkTypes, selectorTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

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

const FormInput = ({ inputLabel, inputConfig }) => (
  <div className="control">
    <Label labelText={inputLabel} isRequired={inputConfig.isRequired} />
    {parseFormInput(inputConfig)}
  </div>
)

export default FormInput

FormInput.propTypes = {
  inputLabel: string,
  inputConfig: shape({
    type: oneOf([...inputTypes, ...checkTypes, ...selectorTypes]).isRequired,
    control: string.isRequired,
    value: string,
    color: oneOf(parseObjKeys(colors)),
    size: oneOf(parseObjKeys(sizes)),
    isRounded: bool,
    placeHolder: string,
    onInputChange: func,
    onBlurChange: func,
    isRequired: bool,
    isDisabled: bool,
    minLength: number,
    maxLength: number
  })
}
