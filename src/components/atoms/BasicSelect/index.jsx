import React, { useState } from 'react'
import PropTypes from 'prop-types'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { colors, sizes } = BULMA_STYLES

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
  const selectClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isMultiple, isLoading, isRounded },
    fieldName: 'select',
    otherClasses: [colors[color], sizes[size]]
  })
  const [selectedValue, setSelectedValue] = useState(
    isMultiple ? (Array.isArray(selected) ? selected : []) : selected
  )
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
    <section key={`${multipleString}-${control}-section`} className={selectClasses} style={styles}>
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
  control: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  // SELECT INPUT PROPS
  selected: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  optionsShown: PropTypes.number,
  isMultiple: PropTypes.bool,
  firstNullOption: PropTypes.bool,
  // STYLE PROPS
  styles: PropTypes.object,
  color: PropTypes.oneOf(parseObjKeys(colors)),
  size: PropTypes.oneOf(parseObjKeys(sizes)),
  isRounded: PropTypes.bool,
  isLoading: PropTypes.bool,
  // FUNCTIONS
  onInputChange: PropTypes.func,
  onBlurChange: PropTypes.func
}
