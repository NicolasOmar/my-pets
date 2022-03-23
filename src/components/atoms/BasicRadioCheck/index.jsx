import React, { useState } from 'react'
import { bool, func, object, oneOf, oneOfType, string } from 'prop-types'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'

const BasicRadioCheck = ({
  type,
  control,
  name = null,
  styles = { marginRight: '5px' },
  label = null,
  isDisabled = false,
  value = false,
  onInputChange
}) => {
  const inputValue = label?.toLowerCase().replace(' ', '')
  const [inputChecked, setInputChecked] = useState(value)

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
  name: string,
  styles: object,
  label: string,
  isDisabled: bool,
  value: oneOfType([string, bool]),
  onInputChange: func
}
