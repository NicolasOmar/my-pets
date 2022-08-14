import React, { useState } from 'react'
import { arrayOf, string, oneOf, shape, func } from 'prop-types'
// COMPONENTS
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'

const RadioCheckGroup = ({ options, type, name, onInputChange, onBlurChange }) => {
  const [groupOptions, setGroupOptions] = useState(options)

  const onOptionChange = (value, control) => {
    const isRadio = type === 'radio'

    onInputChange(
      {
        target: {
          value: isRadio ? control : value
        }
      },
      name
    )

    setGroupOptions(
      groupOptions.map(_option => {
        const isNonSelectedRadio = isRadio && _option.control !== control
        return {
          ..._option,
          value: isNonSelectedRadio ? false : value
        }
      })
    )
  }

  return (
    <section data-testid="test-radio-check-group" className="control">
      {Array.isArray(groupOptions) &&
        groupOptions.map((item, i) => (
          <BasicRadioCheck
            key={`${type}-${name}-${i}`}
            {...{
              ...item,
              type,
              name,
              onInputChange: (value, control) => onOptionChange(value, control),
              onBlurChange: () => onBlurChange(name)
            }}
          />
        ))}
    </section>
  )
}

export default RadioCheckGroup

RadioCheckGroup.propTypes = {
  options: arrayOf(shape(BasicRadioCheck.propTypes)).isRequired,
  type: oneOf(checkTypes).isRequired,
  name: string.isRequired,
  onInputChange: func,
  onBlurChange: func
}
