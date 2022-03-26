import React from 'react'
import { arrayOf, bool, func, number, shape, string, oneOf } from 'prop-types'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseCssClasses, parseObjKeys } from '../../../functions/parsers'

const BasicSelect = ({
  control,
  isRequired = false,
  isDisabled = false,
  selected = null,
  options = [],
  optionsShown = 1,
  isMultiple = false,
  color = parseObjKeys(colors)[3],
  size = parseObjKeys(sizes)[1],
  isRounded = false,
  isLoading = false,
  onInputChange,
  onBlurChange
}) => {
  const selectClass = parseCssClasses({ isMultiple, isLoading, isRounded }, 'select', [
    colors[color],
    sizes[size]
  ])

  return (
    <section className={selectClass}>
      <select
        multiple={isMultiple}
        size={isMultiple ? optionsShown : 1}
        required={isRequired}
        disabled={isDisabled}
        onChange={evt => onInputChange(evt, control)}
        onBlur={() => onBlurChange(control)}
      >
        {Array.isArray(options) &&
          options.map(({ label, value }, i) => (
            <option key={`select-option-${i}`} value={value} selected={selected === value}>
              {label}
            </option>
          ))}
      </select>
    </section>
  )
}

export default BasicSelect

BasicSelect.propTypes = {
  // BASE INPUT PROPS
  control: string.isRequired,
  isRequired: bool,
  isDisabled: bool,
  // SELECT INPUT PROPS
  selected: string,
  options: arrayOf(
    shape({
      label: string,
      value: string
    })
  ),
  optionsShown: number,
  isMultiple: bool,
  // STYLE PROPS
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes)),
  isRounded: bool,
  isLoading: bool,
  // FUNCTIONS
  onInputChange: func,
  onBlurChange: func
}
