import React from 'react'
import { arrayOf, oneOf, oneOfType, string } from 'prop-types'
import { parseObjKeys } from 'functions/parsers'
// ENUMS
import { notificationTypes } from 'constants/bulma-styles.json'

const Message = ({ headerText = null, msgType, messages = [] }) => {
  const renderMsgHeader = headerText =>
    headerText && (
      <section className="message-header">
        <p data-testid={`${msgType}-message-header`}>{headerText}</p>
      </section>
    )

  const renderMsgs = messages => (
    <section className="message-body">
      {Array.isArray(messages) ? (
        <ul>
          {messages.map((msg, i) => (
            <li data-testid={`${msgType}-msg-${i}`} key={`${msgType}-msg-${i}`}>
              {msg}
            </li>
          ))}
        </ul>
      ) : (
        <p data-testid={`${msgType}-msg`}>{messages}</p>
      )}
    </section>
  )

  return (
    <article data-testid={`${msgType}-message`} className={`message ${notificationTypes[msgType]}`}>
      {renderMsgHeader(headerText)}
      {renderMsgs(messages)}
    </article>
  )
}

export default Message

Message.propTypes = {
  headerText: string,
  msgType: oneOf(parseObjKeys(notificationTypes)).isRequired,
  messages: oneOfType([string, arrayOf(string)])
}
