import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys, parseFieldConfigToClasses } from '../../../functions/parsers'

const { columnSizes } = BULMA_STYLES

const Column = ({
  testId = null,
  cssClasses = null,
  style = null,
  _key = null,
  children = null,
  width = null,
  isCentered = false,
  isContainer = false,
  isMultiline = false
}) => {
  const columnClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isCentered, isMultiline },
    fieldName: isContainer ? 'columns' : 'column',
    otherClasses: width ? [columnSizes[width], cssClasses] : [cssClasses]
  })

  return (
    <section key={_key} data-testid={testId} className={columnClasses} style={style}>
      {children}
    </section>
  )
}

export default Column

Column.propTypes = {
  ...elementPropTypes,
  /** `Attribute` Unique key used when the column is part of a list of columns (each with its specific key) */
  _key: PropTypes.string.isRequired,
  /** `Attribute` Indicates which components (could be 1 or more) container in the column */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.elementType]),
  /** `Styling` Indicates column's width using a idea similar to Bootstrap grid system */
  width: PropTypes.oneOf([...parseObjKeys(columnSizes, true), ...parseObjKeys(columnSizes)]),
  /** `Styling` Centers colmun's content */
  isCentered: PropTypes.bool,
  /** `Styling`Enabler to make the column a container for a list of columns (with its own width based on container 's width) */
  isContainer: PropTypes.bool,
  /** `Styling` Used to render several components in more than 1 line and use column's designated width */
  isMultiline: PropTypes.bool
}
