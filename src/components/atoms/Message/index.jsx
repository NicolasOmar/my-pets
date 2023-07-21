import React from 'react'
import PropTypes from 'prop-types'
// ENUMS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const { notificationTypes } = BULMA_STYLES

const Message = ({ headerText = null, msgType, messages = [], styles = {} }) => {
  const renderMsgHeader = headerText =>
    headerText && (
      <section className="message-header">
        <p data-testid={`test-${msgType}-message-header`}>{headerText}</p>
      </section>
    )

  const renderMsgs = messages => (
    <section className="message-body">
      {Array.isArray(messages) ? (
        <ul>
          {messages.map((msg, i) => (
            <li data-testid={`test-${msgType}-msg-${i}`} key={`${msgType}-msg-${i}`}>
              {msg}
            </li>
          ))}
        </ul>
      ) : (
        <p data-testid={`test-${msgType}-msg`} key={`${msgType}-msg`}>
          {messages}
        </p>
      )}
    </section>
  )

  return (
    <article
      data-testid={`${msgType}-message`}
      className={`message ${notificationTypes[msgType]}`}
      style={styles}
    >
      {renderMsgHeader(headerText)}
      {renderMsgs(messages)}
    </article>
  )
}

export default Message

Message.propTypes = {
  headerText: PropTypes.string,
  msgType: PropTypes.oneOf(parseObjKeys(notificationTypes)).isRequired,
  messages: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  // STYLE PROPS
  styles: PropTypes.object
}
