import React, { useState } from 'react'
import { bool, func, oneOf, oneOfType, string } from 'prop-types'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'

const BasicRadioCheck = ({
  type,
  control,
  value = false,
  isRequired = false,
  isDisabled = false,
  name = null,
  label = null,
  onInputChange,
  onBlurChange
}) => {
  const [inputChecked, setInputChecked] = useState(value)
  const inputValue = label?.toLowerCase().replace(' ', '')
  const styles = { marginRight: '5px' }

  const onCheckChange = () => {
    onInputChange({ value: !inputChecked }, control)
    setInputChecked(!inputChecked)
  }

  return (
    <label className={type} style={styles}>
      <input
        type={type}
        name={name}
        value={inputValue}
        style={styles}
        required={isRequired}
        disabled={isDisabled}
        checked={inputChecked}
        onChange={() => onCheckChange()}
        onBlur={() => onBlurChange(control)}
      />
      {label}
    </label>
  )
}

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
  // FUNCTIONS
  onInputChange: func,
  onBlurChange: func
}
