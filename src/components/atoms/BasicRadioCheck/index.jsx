
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'

const { checkTypes } = TAG_TYPES

const BasicRadioCheck = ({
  testId = null,
  cssClasses = null,
  style = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = { marginRight: '5px' },
  type,
  control,
  value = false,
  isRequired = false,
  isDisabled = false,
  name = null,
  label = null,
  onInputChange,
  onBlurChange
}) => {
  const radioTestId = testId ?? `test-${control}-${type}`
  const radioContainerTestId = containerTestId ?? `test-container-${control}-${type}`
  const radioContainerClasses = `${type} ${containerCssClasses}`

  return (
    <label
      data-testid={radioContainerTestId}
      className={radioContainerClasses}
      style={containerStyle}
    >
      <input
        key={`${control}-${type}`}
        data-testid={radioTestId}
        type={type}
        name={name}
        value={label?.toLowerCase().replace(' ', '')}
        className={cssClasses ?? undefined}
        style={style}
        required={isRequired}
        disabled={isDisabled}
        checked={value}
        onChange={() => onInputChange(!value, control)}
        onBlur={() => onBlurChange()}
      />
      {label}
    </label>
  )
}

export default BasicRadioCheck

BasicRadioCheck.propTypes = {
  ...complexPropTypes,
  /** `Attribute` `Required`. Input type you will use */
  type: PropTypes.oneOf(checkTypes).isRequired,
  /** `Attribute` `Required`. Used to populate several input's properties */
  control: PropTypes.string.isRequired,
  /** `Attribute` Set's input's value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** `Attribute` Marks the input as required */
  isRequired: PropTypes.bool,
  /** `Attribute` Makes the input unable to be clicked */
  isDisabled: PropTypes.bool,
  /** `Attribute` Radio/Check input primitive property */
  name: PropTypes.string,
  /** `Attribute` Input's text that will be shown */
  label: PropTypes.string,
  /** `Function` Sends input inverted value and control information to its parent component when user press a new key */
  onInputChange: PropTypes.func,
  /** `Function` Reutilize input's onBlur function and resend a notification to its parent component when user changes its focus to other form input */
  onBlurChange: PropTypes.func
}
