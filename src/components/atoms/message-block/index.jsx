import React from 'react'
import { arrayOf, oneOf, oneOfType, string } from 'prop-types'
import { parseObjKeys } from 'functions/parsers'
// ENUMS
import { notificationTypes } from 'constants/bulma-styles.json'

const MessageBlock = ({ headerText, msgType, messages }) => (
  <section
    data-testid={`${msgType}-notification`}
    className={`notification ${notificationTypes[msgType]}`}
  >
    <section className="content">
      {headerText && <h2 data-testid={`${msgType}-header`}>{headerText}</h2>}
      {messages &&
        (Array.isArray(messages) ? (
          <ul>
            {messages?.map((msg, i) => (
              <li data-testid={`${msgType}-msg-${i}`} key={`${msgType}-msg-${i}`}>
                {msg}
              </li>
            ))}
          </ul>
        ) : (
          <p data-testid={`${msgType}-msg`}>{messages}</p>
        ))}
    </section>
  </section>
)

export default MessageBlock

MessageBlock.propTypes = {
  headerText: string,
  msgType: oneOf(parseObjKeys(notificationTypes)).isRequired,
  messages: oneOfType([string, arrayOf(string)])
}
