import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// ENUMS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const { notificationTypes } = BULMA_STYLES

const Message = ({
  testId = null,
  cssClasses = null,
  style = null, 
  headerText = null,
  msgType,
  messages = []
}) => {
  const messageTestId = testId ?? `${msgType}-message`
  const messageClasses = `message ${notificationTypes[msgType]} ${cssClasses ?? ''}`
  const renderMsgHeader = () =>
    headerText && (
      <section className="message-header">
        <p data-testid={`test-${msgType}-message-header`}>{headerText}</p>
      </section>
    )
  const renderMsgs = () => (
    <section className="message-body">
      {Array.isArray(messages) ? (
        <ul>
          {messages.map((msg, i) => (
            <li key={`${msgType}-msg-${i}`} data-testid={`test-${msgType}-msg-${i}`}>
              {msg}
            </li>
          ))}
        </ul>
      ) : (
        <p key={`${msgType}-msg`} data-testid={`test-${msgType}-msg`}>
          {messages}
        </p>
      )}
    </section>
  )

  return (
    <article
      data-testid={messageTestId}
      className={messageClasses}
      style={style ?? undefined}
    >
      {renderMsgHeader()}
      {renderMsgs()}
    </article>
  )
}

export default Message

Message.propTypes = {
  ...elementPropTypes,
  /** `Attribute` Sets the text that will be shown on the header */
  headerText: PropTypes.string,
  /** `Required` `Attribute` Sets message container color based on one of several types */
  msgType: PropTypes.oneOf(parseObjKeys(notificationTypes)).isRequired,
  /** `Attribute` Sets the text that will be show on the conteniner. Can be one or several texts */
  messages: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}
