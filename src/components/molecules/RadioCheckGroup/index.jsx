import React from 'react'
import { arrayOf, string, oneOf, oneOfType } from 'prop-types'
// COMPONENTS
import BasicRadioCheck from '../../atoms/BasicRadioCheck'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'

const RadioCheckGroup = ({ options, type, name }) => (
  <section data-testid="radio-check-group" className="control">
    {Array.isArray(options) &&
      options.map((item, i) => (
        <BasicRadioCheck key={`radio-${name}-${i}`} {...{ ...item, type, name }} />
      ))}
  </section>
)

export default RadioCheckGroup

RadioCheckGroup.propTypes = {
  options: arrayOf(oneOfType([BasicRadioCheck.propTypes])).isRequired,
  type: oneOf(checkTypes).isRequired,
  name: string.isRequired
}
