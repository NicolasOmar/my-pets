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
  onClickCb = () => {}
}) => {
  const marginRight = '5px'
  const inputValue = label?.toLowerCase().replace(' ', '')
  const [inputChecked, setInputChecked] = useState(isChecked)

  const onCheck = () => {
    onClickCb({ label, name, value: !inputChecked, inputValue })
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
  onClickCb: func
}
