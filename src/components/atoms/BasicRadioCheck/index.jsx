import React from 'react'
import PropTypes from 'prop-types'
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
  type: PropTypes.oneOf(checkTypes).isRequired,
  control: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  // RADIO/CHECK INPUT PROPS
  name: PropTypes.string,
  label: PropTypes.string,
  // STYLE PROPS
  styles: PropTypes.object,
  // FUNCTIONS
  onInputChange: PropTypes.func,
  onBlurChange: PropTypes.func
}
