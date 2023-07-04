import React from 'react'
import PropTypes from 'prop-types'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys, parseFieldConfigToClasses } from '../../../functions/parsers'

const { columnSizes } = BULMA_STYLES

const Column = ({
  _key = null,
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
    <section key={_key} data-testid={testId} className={columnClasses} style={styles}>
      {children}
    </section>
  )
}

export default Column

Column.propTypes = {
  _key: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  width: PropTypes.oneOf([...parseObjKeys(columnSizes, true), ...parseObjKeys(columnSizes)]),
  isCentered: PropTypes.bool,
  isContainer: PropTypes.bool,
  isMultiline: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.elementType]),
  styles: PropTypes.object
}
