import React from 'react'
import { number, element } from 'prop-types'
// ENUMS
import { columnWidth } from '../../../enums/buttons.enum.json'

const GridLayout = ({ width, children }) => {
  const baseConfig = {
    width: 8,
    textAlign: 'center'
  }
  const widthClass = `${columnWidth[width || baseConfig.width]} wide column`

  return (
    <div className="ui grid centered">
      <div className={widthClass}>{children}</div>
    </div>
  )
}

export default GridLayout

GridLayout.propTypes = {
  width: number,
  children: element
}
