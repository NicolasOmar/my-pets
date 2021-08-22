import React from 'react'
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
// OTHER COMPONENTS
import BasicButton from '../../atoms/basic-button'
// ENUMS
import { buttonTypeEnums } from '../../../enums/type.enums.json'
import { colorEnums } from '../../../enums/styles.enums.json'

const ButtonGroup = ({ buttons, separator }) => {
  return (
    <div data-testid="button-group" className="ui buttons">
      <BasicButton {...buttons[0]} />
      <div className={'or'} data-text={separator || 'or'}></div>
      <BasicButton {...buttons[1]} />
    </div>
  )
}

export default ButtonGroup

ButtonGroup.propTypes = {
  buttons: arrayOf(
    shape({
      type: oneOf(buttonTypeEnums).isRequired,
      color: oneOf(colorEnums),
      isDisabled: bool,
      onClick: func,
      label: string.isRequired
    })
  ),
  separator: string
}
