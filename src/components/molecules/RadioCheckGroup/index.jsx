import React, { useState } from 'react'
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// COMPONENTS
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'

const { checkTypes } = TAG_TYPES

const RadioCheckGroup = ({
  testId = null,
  cssClasses = null,
  style = null,
  options,
  type,
  name,
  value = null,
  onInputChange,
  onBlurChange
}) => {
  const groupTestId = testId ?? 'test-radio-check-group'
  const groupClasses = cssClasses ?? 'control'
  const isRadioType = type === 'radio'
  const [groupOptions, setGroupOptions] = useState(options)

  const onOptionChange = (_value, control) => {
    onInputChange(
      {
        target: {
          value: isRadioType ? control : _value
        }
      },
      name
    )

    setGroupOptions(
      groupOptions.map(_option => ({
        ..._option,
        value: isRadioType ? _option.control === control : _value
      }))
    )
  }

  return (
    Array.isArray(groupOptions) && (
      <section data-testid={groupTestId} className={groupClasses} style={style ?? undefined}>
        {groupOptions.map((item, i) => (
          <BasicRadioCheck
            key={`${type}-${name}-${i}`}
            {...{
              ...item,
              value: isRadioType
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
  ...elementPropTypes,
  /** `Attribute` `Required` Sets the options that will be shown inside this group */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      control: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  /** `Attribute` `Required` Sets the type for all the controls inside the group */
  type: PropTypes.oneOf(checkTypes).isRequired,
  /** `Attribute` `Required` Used to indicate in the `onInputChange` and `onBlurChange` which input has been affected after executing that function */
  name: PropTypes.string.isRequired,
  /** `Attribute` Indicate which of the displayed options has been selected. Can be one in a single string or several in an array of strings (as well a boolean case for the RadioButton case) */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.bool
  ]),
  /** `Function` Sends event and control information to its parent component when user press a new key */
  onInputChange: PropTypes.func,
  /** `Function` Sends control information to its parent component when user changes its focus to other input */
  onBlurChange: PropTypes.func
}
