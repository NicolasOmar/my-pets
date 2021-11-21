import React from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import BasicRadio from '../../atoms/BasicRadio'

const RadioGroup = ({ radios, name }) => (
  <div data-testid="radio-group" className="control">
    {radios.map((radioItem, i) => (
      <BasicRadio key={`radio-${name}-${i}`} {...{ ...radioItem, name }} />
    ))}
  </div>
)

export default RadioGroup

RadioGroup.propTypes = {
  radios: arrayOf(
    shape({
      label: string,
      isDisabled: bool,
      isChecked: bool,
      name: string,
      onClickRadio: func
    })
  ).isRequired,
  name: string.isRequired
}
