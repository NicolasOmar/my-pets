
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import TAG_TYPES from '../../../constants/tag-types.json'
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { inputTypes } = TAG_TYPES
const { colors, sizes } = BULMA_STYLES

const BasicInput = ({
  testId = null,
  cssClasses = null,
  style = null,
  type,
  control,
  value = '',
  isRequired = false,
  isDisabled = false,
  placeHolder = null,
  minLength = null,
  maxLength = null,
  color = parseObjKeys(colors)[5],
  size = parseObjKeys(sizes)[1],
  isRounded = false,
  onInputChange,
  onBlurChange
}) => {
  const inputClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isRounded },
    fieldName: 'input',
    otherClasses: [colors[color], sizes[size], cssClasses]
  })
  const inputTestId = testId ?? `test-${control}-${type}`

  return (
    <input
      key={`${control}-${type}`}
      data-testid={inputTestId}
      type={type}
      className={inputClasses}
      style={style ?? undefined}
      value={value}
      placeholder={placeHolder}
      required={isRequired}
      disabled={isDisabled}
      onChange={evt => (onInputChange ? onInputChange(evt, control) : undefined)}
      onBlur={() => (onBlurChange ? onBlurChange(control) : undefined)}
      name={control.toLowerCase().replace(' ', '-')}
      minLength={minLength}
      maxLength={maxLength}
    />
  )
}

export default BasicInput

BasicInput.propTypes = {
  ...elementPropTypes,
  /** `Attribute` `Required`. Input's type you will use */
  type: PropTypes.oneOf(inputTypes).isRequired,
  /** `Attribute` `Required`. Used to populate several input's properties */
  control: PropTypes.string.isRequired,
  /** `Attribute` Set's input's value */
  value: PropTypes.string,
  /** `Attribute` Marks the input as required */
  isRequired: PropTypes.bool,
  /** `Attribute` Makes the input unable to be clicked */
  isDisabled: PropTypes.bool,
  /** `Attribute` Sets a placeholder text that will be shown while the user doesn't input any */
  placeHolder: PropTypes.string,
  /** `Attribute` Sets input's minimun length of characters */
  minLength: PropTypes.number,
  /** `Attribute` Sets input's maximun length of characters */
  maxLength: PropTypes.number,
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(parseObjKeys(colors)),
  /** `Styling` Sets a size based on Bulma's size options */
  size: PropTypes.oneOf(parseObjKeys(sizes)),
  /** `Styling` Makes input's corners rounded */
  isRounded: PropTypes.bool,
  /** `Function` Sends event and control information to its parent component when user press a new key */
  onInputChange: PropTypes.func,
  /** `Function` Sends control information to its parent component when user changes its focus to other form input */
  onBlurChange: PropTypes.func
}
