import React from 'react'
import { number, element, array, oneOfType } from 'prop-types'
// ENUMS
import { columnWidth } from '../../../enums/buttons.enum.json'

const GridLayout = ({ width, children }) => {
  const baseConfig = {
    width: 8,
    textAlign: 'center'
  }
  const widthClass = `${columnWidth[width || baseConfig.width]} wide column`

  return (
    <div data-testid={'grid-test-layout'} className="ui grid centered">
      <div className={widthClass}>{children}</div>
    </div>
  )
}

export default GridLayout

GridLayout.propTypes = {
  width: number,
  children: oneOfType([element, array])
}
