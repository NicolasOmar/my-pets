import React, { useState } from 'react'
import { arrayOf, bool, func, number, shape, string, oneOf, object, oneOfType } from 'prop-types'
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
  firstNullOption = false,
  styles = {},
  color = parseObjKeys(colors)[3],
  size = parseObjKeys(sizes)[1],
  isRounded = false,
  isLoading = false,
  onInputChange,
  onBlurChange
}) => {
  const multipleString = isMultiple ? 'multiple' : 'single'
  const selectClass = parseCssClasses({ isMultiple, isLoading, isRounded }, 'select', [
    colors[color],
    sizes[size]
  ])
  const parsedSelected = isMultiple ? (Array.isArray(selected) ? selected : []) : selected
  const [selectedValue, setSelectedValue] = useState(parsedSelected)
  const parsedOptions = firstNullOption ? [{ label: '', value: null }, ...options] : options

  const processSelection = ({ ctrlKey, shiftKey, originalData, selectedOpts, newSelection }) => {
    if (!newSelection || (shiftKey && ctrlKey)) return selectedOpts
    if (!shiftKey && !ctrlKey) return [newSelection]

    if (shiftKey) {
      const lastSelect = originalData.indexOf(selectedOpts[selectedOpts.length - 1])
      const newSelect = originalData.indexOf(newSelection)
      const slicing = lastSelect < newSelect ? [lastSelect, newSelect] : [newSelect, lastSelect]

      return [...new Set([...selectedOpts, ...originalData.slice(...slicing), newSelection])]
    }

    if (ctrlKey)
      return selectedOpts.find(item => item === newSelection)
        ? selectedOpts.filter(item => item !== newSelection)
        : [...selectedOpts, newSelection]
  }

  const onInternalChange = (evt, control) => {
    const { ctrlKey, shiftKey, target } = evt
    const newValue = isMultiple
      ? processSelection({
          ctrlKey,
          shiftKey,
          originalData: parsedOptions.map(({ value }) => value),
          selectedOpts: selectedValue,
          newSelection: target?.value
        })
      : target?.value

    setSelectedValue(newValue)
    onInputChange(
      {
        ...evt,
        target: {
          ...evt.target,
          value: newValue
        }
      },
      control
    )
  }

  return (
    <section key={`${multipleString}-${control}-section`} className={selectClass} style={styles}>
      <select
        key={`${multipleString}-${control}`}
        data-testid={`test-${multipleString}-${control}`}
        multiple={isMultiple}
        size={isMultiple ? optionsShown : 1}
        required={isRequired}
        disabled={isDisabled}
        onClick={evt => isMultiple && onInternalChange(evt, control)}
        onChange={evt => !isMultiple && onInternalChange(evt, control)}
        onBlur={() => onBlurChange(control)}
        value={selectedValue}
      >
        {Array.isArray(parsedOptions) &&
          parsedOptions.map(({ label, value }, i) => (
            <option
              key={`select-option-${i}`}
              data-testid={`test-select-option-${i}`}
              value={value}
            >
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
  selected: oneOfType([arrayOf(string), string]),
  options: arrayOf(
    shape({
      label: string,
      value: string
    })
  ),
  optionsShown: number,
  isMultiple: bool,
  firstNullOption: bool,
  // STYLE PROPS
  styles: object,
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes)),
  isRounded: bool,
  isLoading: bool,
  // FUNCTIONS
  onInputChange: func,
  onBlurChange: func
}
