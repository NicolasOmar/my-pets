import React from 'react'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { parseCssClasses } from '../../../functions/parsers'

const BasicSelect = ({
  options = [],
  control,
  isMultiple = false,
  optionsShown = 0,
  isDisabled = false,
  isLoading = false,
  onInputChange
}) => {
  const selectClass = parseCssClasses({ isMultiple, isLoading }, 'select')

  return (
    <section className={selectClass}>
      <select
        multiple={isMultiple}
        size={isMultiple ? optionsShown : 0}
        disabled={isDisabled}
        onChange={evt => onInputChange(evt, control)}
      >
        {Array.isArray(options) &&
          options.map(({ label, value }, i) => (
            <option key={`select-option-${i}`} value={value}>
              {label}
            </option>
          ))}
      </select>
    </section>
  )
}

export default BasicSelect

BasicSelect.propTypes = {
  options: arrayOf(
    shape({
      label: string,
      value: string
    })
  ),
  control: string.isRequired,
  isMultiple: bool,
  optionsShown: number,
  isLoading: bool,
  isDisabled: bool,
  onInputChange: func
}
