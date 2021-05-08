import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import Title from '../title/title'
// ENUMS
import { columnWidth } from '../../../enums/buttons.enum.json'

const GridLayout = ({ header, width, children }) => {
  const baseConfig = {
    width: 8,
    textAlign: 'center'
  }

  const widthClass = `${columnWidth[width || baseConfig.width]} wide column`
  const renderHeader = () => {
    return header ? <Title {...header} /> : null
  }

  return (
    <div>
      <div className="ui grid centered">
        <div className={widthClass}>
          {renderHeader()}
          {children}
        </div>
      </div>
    </div>
  )
}

export default GridLayout

GridLayout.propTypes = {
  header: PropTypes.shape({
    as: PropTypes.string,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    textAlign: PropTypes.string
  }),
  width: PropTypes.number,
  children: PropTypes.element
}
