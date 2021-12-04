import React from 'react'
import { arrayOf, bool, func, shape, string, oneOf } from 'prop-types'
// COMPONENTS
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'

const RadioCheckGroup = ({ items, name }) => (
  <div data-testid="radio-check-group" className="control">
    {items.map((item, i) => (
      <BasicRadioCheck key={`radio-${name}-${i}`} {...{ ...item, name }} />
    ))}
  </div>
)

export default RadioCheckGroup

RadioCheckGroup.propTypes = {
  items: arrayOf(
    shape({
      type: oneOf(checkTypes).isRequired,
      label: string,
      isDisabled: bool,
      isChecked: bool,
      onClick: func
    })
  ).isRequired,
  name: string.isRequired
}
