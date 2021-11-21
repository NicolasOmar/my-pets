import React, { useState } from 'react'
import { bool, func, string } from 'prop-types'

const BasicRadio = ({
  label = null,
  name = null,
  isDisabled = false,
  isChecked = false,
  onClickRadio = () => {}
}) => {
  const [checkedRadio, setCheckedRadio] = useState(isChecked)

  const onCheckRadio = () => {
    onClickRadio({ label, name })
    setCheckedRadio(!checkedRadio)
  }

  return (
    <label className="radio">
      <input
        type="radio"
        name={name}
        disabled={isDisabled}
        checked={checkedRadio}
        onChange={() => onCheckRadio()}
      />
      {label}
    </label>
  )
}

export default BasicRadio

BasicRadio.propTypes = {
  label: string,
  isDisabled: bool,
  isChecked: bool,
  name: string,
  onClickRadio: func
}
