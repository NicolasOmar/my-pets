import React from 'react'
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
// OTHER COMPONENTS
import BasicButton from '../../atoms/BasicButton'
// CONSTANTS
import { buttonTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseCssClasses, parseObjKeys } from '../../../functions/parsers'

const ButtonGroup = ({ buttons, isCentered = true }) => {
  const btnGroupClass = parseCssClasses({ isCentered }, 'buttons', ['has-addons'])
  return (
    <section data-testid="button-group" className={btnGroupClass}>
      {buttons.map((button, i) => (
        <BasicButton key={`btn-${button.color}-${i}`} {...button} />
      ))}
    </section>
  )
}

export default ButtonGroup

ButtonGroup.propTypes = {
  buttons: arrayOf(
    shape({
      type: oneOf(buttonTypes).isRequired,
      color: oneOf(parseObjKeys(colors)),
      size: oneOf(parseObjKeys(sizes)),
      isOutlined: bool,
      isInverted: bool,
      isLoading: bool,
      isDisabled: bool,
      onClick: func,
      label: string.isRequired
    })
  ).isRequired,
  isCentered: bool
}
