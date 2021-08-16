import React from 'react'
import { string, array, element, shape, bool, oneOf, oneOfType } from 'prop-types'
// COMPONENTS
import Title from '../../elements/title'
import GridLayout from '../../molecules/grid-layout'
// ENUMS
import { columnWidthEnums, colorEnums } from '../../../enums/styles.enums.json'

const BasicFrame = ({ header, width = 8, color, centerGrid = false, children }) => {
  const renderHeader = () => (header ? <Title {...header} /> : null)

  return (
    <GridLayout {...{ width, color, centerGrid }}>
      {renderHeader()}
      {children}
    </GridLayout>
  )
}

export default BasicFrame

BasicFrame.propTypes = {
  header: shape({
    title: string.isRequired,
    subTitle: string,
    centered: bool
  }),
  width: oneOf(Object.keys(columnWidthEnums).map(width => +width)),
  color: oneOf(colorEnums),
  centerGrid: bool,
  children: oneOfType([element, array])
}
