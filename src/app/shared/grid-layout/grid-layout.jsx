import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'

const GridLayout = ({ header, width, children }) => {
  const baseConfig = {
    width: 8,
    as: 'h1',
    textAlign: 'center'
  }

  const renderHeader = () => {
    return (
      <Header as={header.as || baseConfig.as} textAlign={header.textAlign || baseConfig.textAlign}>
        {header.title}
        {header.subTitle && <Header.Subheader>{header.subTitle}</Header.Subheader>}
      </Header>
    )
  }

  return (
    <div>
      {header && renderHeader()}

      <Grid centered>
        <Grid.Column width={width || baseConfig.width}>{children}</Grid.Column>
      </Grid>
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
