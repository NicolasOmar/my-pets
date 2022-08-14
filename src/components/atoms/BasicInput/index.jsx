import React from 'react'
import { bool, func, string, number, oneOf, object } from 'prop-types'
// CONSTANTS
import { inputTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseCssClasses, parseObjKeys } from '../../../functions/parsers'

const BasicInput = ({
  type,
  control,
  value = '',
  isRequired = false,
  isDisabled = false,
  placeHolder = null,
  minLength = null,
  maxLength = null,
  styles = {},
  color = parseObjKeys(colors)[3],
  size = parseObjKeys(sizes)[1],
  isRounded = false,
  onInputChange,
  onBlurChange
}) => {
  const inputClass = parseCssClasses({ isRounded }, 'input', [colors[color], sizes[size]])
  return (
    <input
      key={`${control}-${type}`}
      data-testid={`test-${control}-${type}`}
      type={type}
      className={inputClass}
      style={styles}
      value={value}
      placeholder={placeHolder}
      required={isRequired}
      disabled={isDisabled}
      onChange={evt => onInputChange(evt, control)}
      onBlur={() => onBlurChange(control)}
      name={control.toLowerCase().replace(' ', '-')}
      minLength={minLength}
      maxLength={maxLength}
    />
  )
}

export default BasicInput

BasicInput.propTypes = {
  // BASE INPUT PROPS
  type: oneOf(inputTypes).isRequired,
  control: string.isRequired,
  value: string,
  isRequired: bool,
  isDisabled: bool,
  // TEXT INPUT PROPS
  placeHolder: string,
  minLength: number,
  maxLength: number,
  // STYLE PROPS
  styles: object,
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes)),
  isRounded: bool,
  // FUNCTIONS
  onInputChange: func,
  onBlurChange: func
}
