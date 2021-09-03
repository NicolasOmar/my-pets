import React from 'react'
import { arrayOf, oneOf, oneOfType, string } from 'prop-types'
// ENUMS
import { messageTypes } from '../../../enums/type.enums.json'

const MessageBlock = ({ header, msgType, errors }) => (
  <div data-testid={`${msgType}-block`} className={`ui ${msgType} message`}>
    {header && (
      <div data-testid={`${msgType}-header`} className="header">
        {header}
      </div>
    )}
    {Array.isArray(errors) ? (
      <ul className="list">
        {errors?.map((errorMsg, i) => (
          <li data-testid={`${msgType}-msg-${i}`} key={`${msgType}-msg-${i}`}>
            {errorMsg}
          </li>
        ))}
      </ul>
    ) : (
      errors && <p data-testid={`${msgType}-msg`}>{errors}</p>
    )}
  </div>
)

export default MessageBlock

MessageBlock.propTypes = {
  header: string,
  msgType: oneOf(messageTypes).isRequired,
  errors: oneOfType([string, arrayOf(string)])
}
