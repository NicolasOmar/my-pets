import React from 'react'
import { shape, bool, func, string, number, oneOf } from 'prop-types'
// COMPONENTS
import BasicInput from '../../atoms/BasicInput'
// CONSTANTS
import { inputTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const FormInput = ({ inputLabel, inputConfig }) => {
  return (
    <div className="field">
      {inputLabel && (
        <label className="label">
          {inputLabel}
          {inputConfig.isRequired && <label style={{ color: 'red' }}>*</label>}
        </label>
      )}
      <BasicInput {...{ ...inputConfig, color: inputConfig.isValid === false ? 'danger' : null }} />
    </div>
  )
}

export default FormInput

FormInput.propTypes = {
  inputLabel: string,
  inputConfig: shape({
    type: oneOf(inputTypes).isRequired,
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
