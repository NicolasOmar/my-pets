import React from 'react'
import { bool, func, string, number, oneOf } from 'prop-types'
// ENUMS
import { inputTypeEnums } from '../../../enums/input.enums.json'

const BasicInput = ({
  type,
  control,
  value,
  placeHolder,
  onInputChange,
  onBlurChange,
  isRequired,
  isDisabled,
  minLength,
  maxLength
}) => (
  <div className="ui input">
    <input
      type={type}
      value={value || ''}
      placeholder={placeHolder || null}
      required={isRequired || false}
      disabled={isDisabled || false}
      onChange={evt => onInputChange(evt, control)}
      onBlur={() => onBlurChange(control)}
      name={control.toLowerCase().replace(' ', '-')}
      minLength={minLength || null}
      maxLength={maxLength || null}
    />
  </div>
)

export default BasicInput

BasicInput.propTypes = {
  type: oneOf(inputTypeEnums).isRequired,
  control: string.isRequired,
  value: string,
  placeHolder: string,
  onInputChange: func,
  onBlurChange: func,
  isRequired: bool,
  isDisabled: bool,
  minLength: number,
  maxLength: number
}
