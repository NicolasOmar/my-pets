import React from 'react'
import { bool, func, string } from 'prop-types'

const BasicRadio = ({
  label = null,
  name = null,
  isDisabled = false,
  isChecked = false,
  onClickRadio = () => {}
}) => (
  <label className="radio">
    <input
      type="radio"
      name={name}
      disabled={isDisabled}
      checked={isChecked}
      onChange={() => onClickRadio({ label, name })}
    />
    {label}
  </label>
)

export default BasicRadio

BasicRadio.propTypes = {
  label: string,
  isDisabled: bool,
  isChecked: bool,
  name: string,
  onClickRadio: func
}
