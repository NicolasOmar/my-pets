import React from 'react'
import { bool, func, string, number, oneOf } from 'prop-types'
// ENUMS
import { inputTypeEnums } from '../../../enums/type.enums.json'
import { colorEnums, sizeEnums } from '../../../enums/styles.enums.json'
// FUNCTIONS
import { parseCssClasses } from '../../../functions/parsers'

const BasicInput = ({
  type,
  control,
  value = null,
  color = null,
  size = sizeEnums[0],
  isRounded = false,
  placeHolder,
  onInputChange,
  onBlurChange,
  isRequired,
  isDisabled,
  minLength,
  maxLength
}) => {
  const inputClass = parseCssClasses({ isRounded }, 'input', [color, size])
  return (
    <input
      data-testid={`${control}-${type}`}
      type={type}
      className={inputClass}
      value={value}
      placeholder={placeHolder || null}
      required={isRequired || false}
      disabled={isDisabled || false}
      onChange={evt => onInputChange(evt, control)}
      onBlur={() => onBlurChange(control)}
      name={control.toLowerCase().replace(' ', '-')}
      minLength={minLength || null}
      maxLength={maxLength || null}
    />
  )
}

export default BasicInput

BasicInput.propTypes = {
  type: oneOf(inputTypeEnums).isRequired,
  control: string.isRequired,
  value: string,
  color: oneOf(colorEnums),
  size: oneOf(sizeEnums),
  isRounded: bool,
  placeHolder: string,
  onInputChange: func,
  onBlurChange: func,
  isRequired: bool,
  isDisabled: bool,
  minLength: number,
  maxLength: number
}
