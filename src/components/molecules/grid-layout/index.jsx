import React from 'react'
import { element, array, oneOfType, bool, oneOf } from 'prop-types'
// ENUMS
import { columnWidthEnums, colorEnums } from '../../../enums/styles.enums.json'

const GridLayout = ({ width = 8, color, isCentered, children }) => {
  const columnColor = color ? `${colorEnums.find(cEnum => cEnum === color)} ` ?? '' : ''
  const widthClass = `${columnColor}${columnWidthEnums[width]} wide column`
  const layoutClass = `ui grid${isCentered ? ' center aligned' : ''}`

  return (
    <div data-testid={'grid-test-layout'} className={layoutClass}>
      {children && <div className={widthClass}>{children}</div>}
    </div>
  )
}

export default GridLayout

GridLayout.propTypes = {
  width: oneOf(Object.keys(columnWidthEnums).map(width => +width)),
  color: oneOf(colorEnums),
  isCentered: bool,
  children: oneOfType([element, array])
}
