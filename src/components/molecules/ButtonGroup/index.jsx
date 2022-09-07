import React from 'react'
import { arrayOf, bool, object, shape } from 'prop-types'
// OTHER COMPONENTS
import BasicButton from '../../atoms/BasicButton'
// FUNCTIONS
import { parseConfigToClassName } from '../../../functions/parsers'

const ButtonGroup = ({ buttons, styles = {}, isCentered = true }) => {
  const btnGroupClass = parseConfigToClassName({ isCentered }, 'buttons', ['has-addons'])
  return (
    <section
      key={'button-group'}
      data-testid="test-button-group"
      className={btnGroupClass}
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
  buttons: arrayOf(shape(BasicButton.propTypes)).isRequired,
  // STYLE PROPS
  styles: object,
  isCentered: bool
}
