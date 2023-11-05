import React from 'react'
import PropTypes from 'prop-types'
// STYLES
import './index.scss'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
import { parseFieldConfigToClasses, parseObjKeys } from '../../../functions/parsers'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// OTHER COMPONENTS

const { colors } = BULMA_STYLES

const Notification = ({
  testId = null,
  cssClasses = null,
  style = null,
  text,
  color = parseObjKeys(colors)[0],
  onDelete = null
}) => {
  const onCloseNotification = () => {
    if (onDelete) {
      onDelete()
    }
  }
  const notificationClasses = parseFieldConfigToClasses({
    useCommonClasses: false,
    fieldConfig: {},
    fieldName: 'notification',
    otherClasses: [colors[color], cssClasses]
  })

  return (
    <section data-testId={testId} class={notificationClasses} style={style ?? undefined}>
      <button class="delete" onClick={onCloseNotification}></button>
      {text}
    </section>
  )
}

export default Notification

Notification.propTypes = {
  ...elementPropTypes,
  /** `Attribure` `Required` Notification's text that will be shown */
  text: PropTypes.string.isRequired,
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(Object.keys(colors)),
  /** `Function` Sends a click signal to its parent component when user clicks on the button */
  onClick: PropTypes.func
}