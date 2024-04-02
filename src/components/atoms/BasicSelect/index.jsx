import { useState } from 'react'
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes, clickeablePropTypes } from '../../../types/commonTypes'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { colors, sizes } = BULMA_STYLES

const BasicSelect = ({
  testId = null,
  cssClasses = null,
  style = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = null,
  control,
  isRequired = false,
  isDisabled = false,
  selected = '',
  options = [],
  optionsShown = 1,
  isMultiple = false,
  firstNullOption = false,
  color = parseObjKeys(colors)[3],
  size = parseObjKeys(sizes)[1],
  isRounded = false,
  isLoading = false,
  onInputChange,
  onBlurChange
}) => {
  const multipleString = isMultiple ? 'multiple' : 'single'
  const selectTestId = testId ?? `test-${multipleString}-${control}`
  const selectContainerTestId = containerTestId ?? `test-container-${multipleString}-${control}`
  const selectContainerClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isMultiple, isLoading, isRounded },
    fieldName: 'select',
    otherClasses: [colors[color], sizes[size], containerCssClasses]
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
    <section
      key={`${multipleString}-${control}-section`}
      data-testid={selectContainerTestId}
      className={selectContainerClasses ?? undefined}
      style={containerStyle}
    >
      <select
        key={`${multipleString}-${control}`}
        data-testid={selectTestId}
        multiple={isMultiple}
        size={isMultiple ? optionsShown : 1}
        required={isRequired}
        disabled={isDisabled}
        className={cssClasses ?? undefined}
        style={style}
        value={selectedValue}
        onClick={evt => isMultiple && onInternalChange(evt, control)}
        onChange={evt => !isMultiple && onInternalChange(evt, control)}
        onBlur={() => onBlurChange(control)}
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
  ...complexPropTypes,
  ...clickeablePropTypes,
  /** `Attribute` `Required`. Used to populate several select's properties */
  control: PropTypes.string.isRequired,
  /** `Attribute` Marks the select as required */
  isRequired: PropTypes.bool,
  /** `Attribute` Makes the select unable to be clicked */
  isDisabled: PropTypes.bool,
  /** `Attribute` Mention which of select's options have been selected */
  selected: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  /** `Attribute` Mention the options that will be selectable */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  /** `Attribute` Display the amount of options without clicking the select. Only when */
  optionsShown: PropTypes.number,
  /** `Attribute` Makes the select capable of hold more of one option selected (in case you */
  isMultiple: PropTypes.bool,
  /** `Attribute` Makes select's text a blank text */
  firstNullOption: PropTypes.bool,
  // STYLE PROPS
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(parseObjKeys(colors)),
  /** `Styling` Sets a size based on Bulma's size options */
  size: PropTypes.oneOf(parseObjKeys(sizes)),
  /** `Styling` Makes select's corners rounded */
  isRounded: PropTypes.bool,
  /** `Styling` Add a spinner animation to select's content */
  isLoading: PropTypes.bool,
  // FUNCTIONS
  /** `Function` Sends event and control information to its parent component when user press a new key */
  onInputChange: PropTypes.func,
  /** `Function` Sends control information to its parent component when user changes its focus to other form input */
  onBlurChange: PropTypes.func
}
