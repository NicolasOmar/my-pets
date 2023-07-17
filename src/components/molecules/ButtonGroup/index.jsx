import React from 'react'
import PropTypes from 'prop-types'
// OTHER COMPONENTS
import BasicButton from '../../atoms/BasicButton'
// FUNCTIONS
import { parseFieldConfigToClasses } from '../../../functions/parsers'

const ButtonGroup = ({ buttons, styles = {}, isCentered = true }) => {
  const btnGroupClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isCentered },
    fieldName: 'buttons',
    otherClasses: ['has-addons']
  })
  return (
    <section
      key={'button-group'}
      data-testid="test-button-group"
      className={btnGroupClasses}
      style={styles}
    >
      {buttons.map((button, i) => (
        <BasicButton key={`btn-${button.color}-${i}`} {...button} />
      ))}
    </section>
  )
}

export default ButtonGroup

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape(BasicButton.propTypes)).isRequired,
  // STYLE PROPS
  styles: PropTypes.object,
  isCentered: PropTypes.bool
}
