import React from 'react'
import { string, bool } from 'prop-types'

const Label = ({ labelText = null, isRequired = false }) =>
  labelText && (
    <label className="label">
      {labelText}
      {isRequired && <label style={{ color: 'red', marginLeft: '2px' }}>*</label>}
    </label>
  )

export default Label

Label.propTypes = {
  labelText: string,
  isRequired: bool
}
