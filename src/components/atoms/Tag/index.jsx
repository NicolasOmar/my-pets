import React from 'react'
import PropTypes from 'prop-types'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'

const { colors, sizes } = BULMA_STYLES

const Tag = ({
  text = null,
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
    otherClasses: [colors[color], sizes[size]]
  })
  const tagTestId = `test-tag-${size}-${color}`
  const deleteTestId = `test-tag-delete-${size}-${color}`

  return (
    <span data-testid={tagTestId} className={tagClasses} onClick={onTextClick}>
      {text}
      {hasDeleteBtn ? (
        <button
          data-testid={deleteTestId}
          className={`delete ${size}`}
          onClick={onDeleteClick}
        ></button>
      ) : null}
    </span>
  )
}

export default Tag

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  hasDeleteBtn: PropTypes.bool,
  // STYLE PROPS
  color: PropTypes.oneOf(parseObjKeys(colors)),
  size: PropTypes.oneOf(parseObjKeys(sizes)),
  isRounded: PropTypes.bool,
  // FUNCTIONS
  onTextClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}
