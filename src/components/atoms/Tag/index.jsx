import React from 'react'
import { bool, func, string, oneOf } from 'prop-types'
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
  const testId = `test-tag-${sizes[size]}-${colors[color]}`

  return (
    <span data-testid={testId} className={tagClasses} onClick={() => onTextClick}>
      {text}
      {hasDeleteBtn ? (
        <button className={`delete ${size}`} onClick={() => onDeleteClick}></button>
      ) : null}
    </span>
  )
}

export default Tag

Tag.propTypes = {
  text: string.isRequired,
  hasDeleteBtn: bool,
  // STYLE PROPS
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes)),
  isRounded: bool,
  // FUNCTIONS
  onTextClick: func,
  onDeleteClick: func
}
