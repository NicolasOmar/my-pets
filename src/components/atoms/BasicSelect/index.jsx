import React from 'react'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import { parseCssClasses } from '../../../functions/parsers'

const BasicSelect = ({
  options = [],
  isMultiple = false,
  optionsShown = 0,
  isLoading = false,
  isDisabled = false
}) => {
  const selectClass = parseCssClasses({ isMultiple, isLoading }, 'select')

  return (
    <section className={selectClass}>
      <select multiple={isMultiple} size={isMultiple ? optionsShown : 0} disabled={isDisabled}>
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
  isMultiple: bool,
  optionsShown: number,
  isLoading: bool,
  isDisabled: bool
}
