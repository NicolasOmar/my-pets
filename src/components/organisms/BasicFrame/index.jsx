import React from 'react'
import { string, array, element, shape, bool, oneOf, oneOfType } from 'prop-types'
// COMPONENTS
import Title from '../../atoms/Title'
import GridLayout from '../../molecules/GridLayout'
// CONSTANTS
import { columnSizes, fontSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const BasicFrame = ({ header, width = 8, centerGrid = false, children }) => {
  const renderHeader = () => (header ? <Title {...header} /> : null)

  return (
    <GridLayout {...{ width, centerGrid }}>
      {renderHeader()}
      {children}
    </GridLayout>
  )
}

export default BasicFrame

BasicFrame.propTypes = {
  header: shape({
    titleText: string.isRequired,
    subText: string,
    titleSize: oneOf(parseObjKeys(fontSizes, true)),
    subSize: oneOf(parseObjKeys(fontSizes, true)),
    isCentered: bool
  }),
  width: oneOf(parseObjKeys(columnSizes, true)),
  centerGrid: bool,
  children: oneOfType([element, array])
}
