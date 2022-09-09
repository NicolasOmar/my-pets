import React from 'react'
import { element, array, oneOfType, oneOf, bool, object } from 'prop-types'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const GridLayout = ({
  children = [],
  width = parseObjKeys(columnSizes)[0],
  centerGrid = false,
  styles = {}
}) => {
  const columnsStyle = centerGrid ? 'columns is-centered' : 'columns'
  const renderChild = (childNode, i = 0) => {
    const columnClass = columnSizes[childNode.props?.childWidth || width]
    return (
      <section
        key={`column-${i}`}
        data-testid={`test-column-${i}`}
        className={`column ${columnClass}`}
        style={styles}
      >
        {childNode}
      </section>
    )
  }

  return Array.isArray(children) ? (
    children.filter(childNode => childNode).every(childNode => childNode?.props?.childWidth) ? (
      <section
        key={`grid-layout`}
        data-testid={`test-grid-layout`}
        className={`${columnsStyle} is-multiline`}
        style={styles}
      >
        {children.filter(childNode => childNode).map((childNode, i) => renderChild(childNode, i))}
      </section>
    ) : (
      children
        .filter(childNode => childNode)
        .map((childNode, i) => (
          <section
            key={`grid-layout-${i}`}
            data-testid={`test-grid-layout-${i}`}
            className={columnsStyle}
            style={styles}
          >
            {renderChild(childNode)}
          </section>
        ))
    )
  ) : (
    <section
      key={`grid-layout`}
      data-testid={`test-grid-layout`}
      className={columnsStyle}
      style={styles}
    >
      {renderChild(children)}
    </section>
  )
}

export default GridLayout

GridLayout.propTypes = {
  children: oneOfType([element, array]),
  width: oneOf(parseObjKeys(columnSizes, true)),
  centerGrid: bool,
  styles: object
}
