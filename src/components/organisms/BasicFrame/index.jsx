import React from 'react'
import { string, array, element, shape, bool, oneOf, oneOfType } from 'prop-types'
// COMPONENTS
import Title from '../../atoms/Title'
import GridLayout from '../../molecules/GridLayout'
// CONSTANTS
import { columnSizes, fontSizes } from 'constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from 'functions/parsers'

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
    title: string.isRequired,
    subTitle: string,
    size: shape({
      title: oneOf(parseObjKeys(fontSizes, true)),
      subTitle: oneOf(parseObjKeys(fontSizes, true))
    })
  }),
  width: oneOf(parseObjKeys(columnSizes, true)),
  centerGrid: bool,
  children: oneOfType([element, array])
}
