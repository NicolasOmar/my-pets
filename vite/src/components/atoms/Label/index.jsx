import React from 'react'
import { string, bool, object } from 'prop-types'

const Label = ({ labelText = null, styles = {}, isRequired = false }) =>
  labelText && (
    <label
      key={`label-${labelText.replace(' ', '-')}`}
      data-testid={`test-label-${labelText.replace(' ', '-')}`}
      className="label"
      style={styles}
    >
      {labelText}
      {isRequired && (
        <label
          data-testid={`test-required-${labelText.replace(' ', '-')}`}
          style={{ color: 'red', marginLeft: '2px' }}
        >
          *
        </label>
      )}
    </label>
  )

export default Label

Label.propTypes = {
  labelText: string,
  // STYLE PROPS
  styles: object,
  isRequired: bool
}
