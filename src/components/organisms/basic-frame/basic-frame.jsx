import React from 'react'
import { string, number, element, shape } from 'prop-types'
// COMPONENTS
import Title from '../../elements/title/title'
import GridLayout from '../../molecules/grid-layout/grid-layout'

const BasicFrame = ({ header, width, children }) => {
  const renderHeader = () => {
    return header ? <Title {...header} /> : null
  }

  return (
    <GridLayout {...{ width, children }}>
      {renderHeader()}
      {children}
    </GridLayout>
  )
}

export default BasicFrame

BasicFrame.propTypes = {
  header: shape({
    as: string,
    title: string.isRequired,
    subTitle: string,
    textAlign: string
  }),
  width: number,
  children: element
}
