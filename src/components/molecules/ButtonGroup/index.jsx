import React from 'react'
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
// OTHER COMPONENTS
import BasicButton from 'components/atoms/BasicButton'
// CONSTANTS
import { buttonTypes } from 'constants/tag-types.json'
import { colors, sizes } from 'constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from 'functions/parsers'

const ButtonGroup = ({ buttons }) => {
  return (
    <div data-testid="button-group" className="buttons has-addons">
      {buttons.map((button, i) => (
        <BasicButton key={`btn-${button.color}-${i}`} {...button} />
      ))}
    </div>
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
  ).isRequired
}
