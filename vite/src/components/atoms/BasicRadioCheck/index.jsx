import React from 'react'
import { bool, func, object, oneOf, oneOfType, string } from 'prop-types'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'

const { checkTypes } = TAG_TYPES

const BasicRadioCheck = ({
  type,
  control,
  value = false,
  isRequired = false,
  isDisabled = false,
  name = null,
  label = null,
  styles = { marginRight: '5px' },
  onInputChange,
  onBlurChange
}) => (
  <label className={type} style={styles}>
    <input
      key={`${control}-${type}`}
      data-testid={`test-${control}-${type}`}
      type={type}
      name={name}
      value={label?.toLowerCase().replace(' ', '')}
      style={styles}
      required={isRequired}
      disabled={isDisabled}
      checked={value}
      onChange={() => onInputChange(!value, control)}
      onBlur={() => onBlurChange()}
    />
    {label}
  </label>
)

export default BasicRadioCheck

BasicRadioCheck.propTypes = {
  // BASE INPUT PROPS
  type: oneOf(checkTypes).isRequired,
  control: string.isRequired,
  value: oneOfType([string, bool]),
  isRequired: bool,
  isDisabled: bool,
  // RADIO/CHECK INPUT PROPS
  name: string,
  label: string,
  // STYLE PROPS
  styles: object,
  // FUNCTIONS
  onInputChange: func,
  onBlurChange: func
}
