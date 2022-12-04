import React from 'react'
import { array, bool, element, elementType, object, oneOf, oneOfType, string } from 'prop-types'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys, parseFieldConfigToClasses } from '../../../functions/parsers'

const { columnSizes } = BULMA_STYLES

const Column = ({
  key = null,
  testId = null,
  width = null,
  isCentered = false,
  isContainer = false,
  isMultiline = false,
  children = null,
  styles = {}
}) => {
  const columnClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isCentered, isMultiline },
    fieldName: isContainer ? 'columns' : 'column',
    otherClasses: width ? [columnSizes[width]] : []
  })

  return (
    <section key={key} data-testid={testId} className={columnClasses} style={styles}>
      {children}
    </section>
  )
}

export default Column

Column.propTypes = {
  key: string.isRequired,
  testId: string.isRequired,
  width: oneOf(parseObjKeys(columnSizes, true)),
  isCentered: bool,
  isContainer: bool,
  isMultiline: bool,
  children: oneOfType([element, array, elementType]),
  styles: object
}
