import React from 'react'
import { element, array, oneOfType, bool, oneOf } from 'prop-types'
// STYLES
import './index.scss'
// ENUMS
import { columnWidthEnums } from '../../../constants/bulma-styles.json'

const GridLayout = ({ width = 8, centerGrid, children }) => {
  const centerClass = centerGrid ? ' center aligned' : ''
  const layoutClass = `ui grid${centerClass}`
  const widthClass = `${columnWidthEnums[width]} wide column`

  const renderChild = childNode => <div className={widthClass}>{childNode}</div>

  return (
    <div data-testid={'grid-test-layout'} className={layoutClass}>
      {Array.isArray(children)
        ? children.filter(childNode => childNode).length > 1
          ? children?.map((childNode, i) => (
              <div key={`grid-test-row-${i}`} className="row">
                {renderChild(childNode)}
              </div>
            ))
          : renderChild(children)
        : renderChild(children)}
    </div>
  )
}

export default GridLayout

GridLayout.propTypes = {
  width: oneOf(Object.keys(columnWidthEnums).map(width => +width)),
  centerGrid: bool,
  children: oneOfType([element, array])
}
