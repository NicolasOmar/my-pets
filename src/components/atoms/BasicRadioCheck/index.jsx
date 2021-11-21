import React, { useState } from 'react'
import { bool, func, oneOf, string } from 'prop-types'
// CONSTANTS
import { selectorTypes } from '../../../constants/tag-types.json'

const BasicRadioCheck = ({
  type,
  label = null,
  name = null,
  isDisabled = false,
  isChecked = false,
  onClick = () => {}
}) => {
  const [inputChecked, setInputChecked] = useState(isChecked)

  const onCheck = () => {
    onClick({ label, name, value: !inputChecked })
    setInputChecked(!inputChecked)
  }

  return (
    <label className={type}>
      <input
        type={type}
        name={name}
        disabled={isDisabled}
        checked={inputChecked}
        onChange={() => onCheck()}
      />
      {label}
    </label>
  )
}

export default BasicRadioCheck

BasicRadioCheck.propTypes = {
  type: oneOf(selectorTypes).isRequired,
  label: string,
  isDisabled: bool,
  isChecked: bool,
  name: string,
  onClick: func
}
