
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { colors, sizes } = BULMA_STYLES

const Tag = ({
  testId = null,
  cssClasses = null,
  style = null,
  text,
  hasDeleteBtn = false,
  color = parseObjKeys(colors)[0],
  size = parseObjKeys(sizes)[1],
  isRounded = false,
  onTextClick,
  onDeleteClick
}) => {
  const tagClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isRounded },
    fieldName: 'tag',
    otherClasses: [colors[color], sizes[size], cssClasses]
  })
  const tagTestId = testId ?? `test-tag-${size}-${color}`
  const deleteTestId = `test-tag-delete-${size}-${color}`

  return text ? (
    <span
      data-testid={tagTestId}
      className={tagClasses}
      style={style ?? undefined}
      onClick={onTextClick}
    >
      {text}
      {hasDeleteBtn ? (
        <button
          data-testid={deleteTestId}
          className={`delete ${size}`}
          onClick={onDeleteClick}
        ></button>
      ) : null}
    </span>
  ) : null
}

export default Tag

Tag.propTypes = {
  ...elementPropTypes,
  /** `Attribute` `Required` Sets the text that will be shown on the tag */
  text: PropTypes.string.isRequired,
  /** `Attribute` Will show a delete button that can include a `click` function */
  hasDeleteBtn: PropTypes.bool,
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(parseObjKeys(colors)),
  /** `Styling` Sets a size based on Bulma's size options */
  size: PropTypes.oneOf(parseObjKeys(sizes)),
  /** `Styling` Makes tag's corners rounded */
  isRounded: PropTypes.bool,
  /** `Function` Sends a click signal from clicking the tag label to its parent component when user clicks on the button */
  onTextClick: PropTypes.func,
  /** `Function` Sends a click signal from clicking its delete button to its parent component when user clicks on the button */
  onDeleteClick: PropTypes.func
}
