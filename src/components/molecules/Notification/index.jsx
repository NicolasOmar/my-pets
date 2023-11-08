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
  isLightColor = false,
  onDeleteClick = null
}) => {
  const notificationClasses = parseFieldConfigToClasses({
    fieldName: 'notification',
    fieldConfig: { isLightColor },
    otherClasses: [colors[color], cssClasses]
  })
  const notificationTestId = testId ?? `test-notification-${colors[color]}`

  return (
    <div data-testid={notificationTestId} className={notificationClasses} style={style ?? undefined}>
      <button data-testid={`${notificationTestId}-delete`} className="delete" onClick={onDeleteClick ?? undefined} />
      {text}
    </div>
  )
}

export default Notification

Notification.propTypes = {
  ...elementPropTypes,
  /** `Attribure` `Required` Notification's text that will be shown */
  text: PropTypes.string.isRequired,
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(Object.keys(colors)),
  /** `Styling` Sets a the color in a lighter variant */
  isLightColor: PropTypes.bool,
  /** `Function` Sends a click signal to its parent component when user clicks on the button */
  onDeleteClick: PropTypes.func
}