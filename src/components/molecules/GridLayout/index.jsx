import React from 'react'
import { element, array, oneOfType, oneOf, bool } from 'prop-types'
// STYLES
import './index.scss'
// ENUMS
import { columnWidths } from '../../../constants/bulma-styles.json'
import { parseObjKeys } from 'functions/parsers'

const GridLayout = ({
  width = parseObjKeys(columnWidths)[0],
  centerGrid = false,
  children = []
}) => {
  const renderChild = childNode => {
    const renderedChild = <div className={`column ${columnWidths[width]}`}>{childNode}</div>

    return centerGrid ? (
      <>
        <div className="column" />
        {renderedChild}
        <div className="column" />
      </>
    ) : (
      renderedChild
    )
  }

  console.error(children)
  return Array.isArray(children) ? (
    children.map((childNode, i) => (
      <div data-testid={`grid-test-layout-${i}`} key={`grid-layout-${i}`} className="columns">
        {renderChild(childNode)}
      </div>
    ))
  ) : (
    <div data-testid={`grid-test-layout`} className="columns">
      {renderChild(children)}
    </div>
  )
}

export default GridLayout

GridLayout.propTypes = {
  width: oneOf(parseObjKeys(columnWidths)),
  centerGrid: bool,
  children: oneOfType([element, array])
}
