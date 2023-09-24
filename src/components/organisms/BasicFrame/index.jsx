import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import TitleHeader from '../../atoms/TitleHeader'
import GridLayout from '../../molecules/GridLayout'

const BasicFrame = ({ header = null, width = 8, centerGrid = false, children = [] }) => {
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
  /** `Attribute` Header configuration object to show a `TitleHeader` above the rest of the components that will compose the frame */
  header: PropTypes.shape(TitleHeader.propTypes),
  ...GridLayout.propTypes
}
