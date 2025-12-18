import { FC } from 'react'
import { Message } from 'reactive-bulma'

interface ErrorMessageProps {
  title: string
  message: string | null
}

const ErrorMessage: FC<ErrorMessageProps> = ({ title, message }) => {
  return message ? <Message headerText={title} bodyText={message} color="danger" /> : null
}

export default ErrorMessage
