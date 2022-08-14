import React from 'react'
import { shape } from 'prop-types'
// COMPONENTS
import TitleHeader from '../../atoms/TitleHeader'
import GridLayout from '../../molecules/GridLayout'

const BasicFrame = ({ header, width = 8, centerGrid = false, children }) => {
  const headerStyles = {
    marginTop: '30px',
    marginBottom: '15px'
  }
  const renderHeader = () =>
    header ? (
      <TitleHeader key="header-title-header" {...{ ...header, styles: headerStyles }} />
    ) : null

  return (
    <GridLayout {...{ width, centerGrid }}>
      {renderHeader()}
      {children}
    </GridLayout>
  )
}

export default BasicFrame

BasicFrame.propTypes = {
  header: shape(TitleHeader.propTypes),
  ...GridLayout.propTypes
}
