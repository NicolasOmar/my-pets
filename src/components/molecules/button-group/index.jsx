import React from 'react'
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
// OTHER COMPONENTS
import BasicButton from '../../elements/basic-button'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/button.enums.json'

const ButtonGroup = ({ buttons, separator }) => {
  return (
    <div className="ui buttons">
      <BasicButton {...buttons[0]} />
      <div className={separator || 'or'}></div>
      <BasicButton {...buttons[1]} />
    </div>
  )
}

export default ButtonGroup

ButtonGroup.propTypes = {
  buttons: arrayOf(
    shape({
      type: oneOf(buttonTypeEnums).isRequired,
      isBasic: bool,
      color: oneOf(buttonColorEnums),
      isRequired: bool,
      isDisabled: bool,
      onClick: func,
      label: string.isRequired
    })
  ),
  separator: string
}
