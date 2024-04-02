import PropTypes from 'prop-types'
// COMPONENTS
import TitleHeader from '../../atoms/TitleHeader'
import Icon from '../../atoms/Icon'
import GridLayout from '../../molecules/GridLayout'

const BasicFrame = ({ header = null, width = 8, centerGrid = false, children = [] }) => {
  const headerStyles = {
    marginTop: '30px',
    marginBottom: '15px'
  }
  const renderHeader = () =>
    header ? (
      <>
        {header.icon ? <Icon key="header-icon" {...header.icon} /> : null}
        {header.title ? (
          <TitleHeader key="header-title-header" {...{ ...header.title, style: headerStyles }} />
        ) : null}
      </>
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
  header: PropTypes.shape({
    title: PropTypes.shape(TitleHeader.propTypes),
    icon: PropTypes.shape(Icon.propTypes)
  }),
  ...GridLayout.propTypes
}
