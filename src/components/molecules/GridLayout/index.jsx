import React from 'react'
import { element, array, oneOfType, oneOf, bool } from 'prop-types'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const GridLayout = ({
  width = parseObjKeys(columnSizes)[0],
  centerGrid = false,
  children = []
}) => {
  const columnsStyle = centerGrid ? 'columns is-centered' : 'columns'
  const renderChild = childNode => {
    const columnClass = childNode.props?.childWidth
      ? columnSizes[childNode.props?.childWidth]
      : columnSizes[width]
    return <div className={`column ${columnClass}`}>{childNode}</div>
  }

  return Array.isArray(children) ? (
    children.every(childNode => childNode.props?.childWidth) ? (
      <div
        data-testid={`grid-layout-test`}
        key={`grid-layout`}
        className={`${columnsStyle} is-multiline`}
      >
        {children.filter(childNode => childNode).map(childNode => renderChild(childNode))}
      </div>
    ) : (
      children
        .filter(childNode => childNode)
        .map((childNode, i) => (
          <div
            data-testid={`grid-layout-test-${i}`}
            key={`grid-layout-${i}`}
            className={columnsStyle}
          >
            {renderChild(childNode)}
          </div>
        ))
    )
  ) : (
    <div data-testid={`grid-layout-test`} className={columnsStyle}>
      {renderChild(children)}
    </div>
  )
}

export default GridLayout

GridLayout.propTypes = {
  width: oneOf(parseObjKeys(columnSizes, true)),
  centerGrid: bool,
  children: oneOfType([element, array])
}
