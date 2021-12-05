import React, { useState } from 'react'
import { bool, func, oneOf, string } from 'prop-types'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'

const BasicRadioCheck = ({
  type,
  control,
  label = null,
  name = null,
  isDisabled = false,
  value = false,
  onInputChange
}) => {
  const marginRight = '5px'
  const inputValue = label?.toLowerCase().replace(' ', '')
  const [inputChecked, setInputChecked] = useState(value)

  const onCheckChange = () => {
    onInputChange({ value: !inputChecked }, control)
    setInputChecked(!inputChecked)
  }

  return (
    <label className={type} style={{ marginRight }}>
      <input
        type={type}
        name={name}
        value={inputValue}
        style={{ marginRight }}
        disabled={isDisabled}
        checked={inputChecked}
        onChange={() => onCheckChange()}
      />
      {label}
    </label>
  )
}

export default BasicRadioCheck

BasicRadioCheck.propTypes = {
  type: oneOf(checkTypes).isRequired,
  control: string.isRequired,
  label: string,
  isDisabled: bool,
  value: bool,
  name: string,
  onInputChange: func
}
