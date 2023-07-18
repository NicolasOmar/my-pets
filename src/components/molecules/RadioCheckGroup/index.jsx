import React, { useState } from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'

const { checkTypes } = TAG_TYPES

const RadioCheckGroup = ({ options, type, name, value = null, onInputChange, onBlurChange }) => {
  const isRadio = type === 'radio'
  const [groupOptions, setGroupOptions] = useState(options)

  const onOptionChange = (_value, control) => {
    onInputChange(
      {
        target: {
          value: isRadio ? control : _value
        }
      },
      name
    )

    setGroupOptions(
      groupOptions.map(_option => ({
        ..._option,
        value: isRadio ? _option.control === control : _value
      }))
    )
  }

  return (
    Array.isArray(groupOptions) && (
      <section data-testid="test-radio-check-group" className="control">
        {groupOptions.map((item, i) => (
          <BasicRadioCheck
            key={`${type}-${name}-${i}`}
            {...{
              ...item,
              value: isRadio
                ? item.control === value
                : Array.isArray(value)
                ? options.find(({ control }) => item.control === control)
                : value,
              type,
              name,
              onInputChange: (value, control) => onOptionChange(value, control),
              onBlurChange: () => onBlurChange(name)
            }}
          />
        ))}
      </section>
    )
  )
}

export default RadioCheckGroup

RadioCheckGroup.propTypes = {
  // GROUP OPTIONS
  options: PropTypes.arrayOf(
    PropTypes.shape({
      control: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  // RADIO/CHECK INPUT PROPS
  type: PropTypes.oneOf(checkTypes).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.bool
  ]),
  // FUNCTIONS
  onInputChange: PropTypes.func,
  onBlurChange: PropTypes.func
}
