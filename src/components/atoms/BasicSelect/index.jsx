import React, { useState } from 'react'
import { arrayOf, bool, func, number, shape, string, oneOf } from 'prop-types'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseCssClasses, parseObjKeys } from '../../../functions/parsers'

const BasicSelect = ({
  control,
  isRequired = false,
  isDisabled = false,
  selected = '',
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
  const parsedSelected = isMultiple ? (Array.isArray(selected) ? selected : []) : selected
  const [selectedValue, setSelectedValue] = useState(parsedSelected)

  const processSelection = ({ ctrlKey, shiftKey }, originalData, newData) => {
    if (!newData) return originalData
    if (shiftKey) {
      const optionValues = options.map(({ value }) => value)
      const lastSelect = optionValues.indexOf(originalData[originalData.length - 1])
      const newSelect = optionValues.indexOf(newData)
      const slicing = lastSelect < newSelect ? [lastSelect, newSelect] : [newSelect, lastSelect]

      return [...new Set([...originalData, ...optionValues.slice(...slicing), newData])]
    }

    if (ctrlKey)
      return originalData.find(item => item === newData)
        ? originalData.filter(item => item !== newData)
        : [...originalData, newData]

    if (!shiftKey && !ctrlKey) return [newData]
    if (shiftKey && ctrlKey) return originalData
  }

  const onInternalChange = (evt, control) => {
    const newValue = isMultiple
      ? processSelection(evt, selectedValue, evt?.target?.value)
      : evt?.target?.value
    setSelectedValue(newValue)
    onInputChange(evt, control)
  }

  return (
    <section className={selectClass}>
      <select
        multiple={isMultiple}
        size={isMultiple ? optionsShown : 1}
        required={isRequired}
        disabled={isDisabled}
        onClick={evt => isMultiple && onInternalChange(evt, control)}
        onChange={evt => !isMultiple && onInternalChange(evt, control)}
        onBlur={() => onBlurChange(control)}
        value={selectedValue}
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
