import React from 'react'
import Message from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// ENUMS
import { notificationTypes } from '../../../constants/bulma-styles.json'
// MOCKS
import { minimalConfig } from './index.mocks.json'
// PARSER
import { parseObjKeys } from '../../../functions/parsers'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Message Block`,
  component: Message,
  argTypes: {
    msgType: {
      options: parseObjKeys(notificationTypes)
    }
  },
  args: minimalConfig
}

const Template = args => <Message {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Warning = Template.bind({})
Warning.storyName = 'Warning'
Warning.args = { msgType: 'warning' }

export const Error = Template.bind({})
Error.storyName = 'Error'
Error.args = { msgType: 'error' }

export const WithTitle = Template.bind({})
WithTitle.storyName = 'With a Title'
WithTitle.args = { ...Error.args, headerText: 'Message header' }

export const WithSeveralMessages = Template.bind({})
WithSeveralMessages.storyName = 'With a message list'
WithSeveralMessages.args = {
  ...WithTitle.args,
  messages: Array(5)
    .fill(null)
    .map((_, i) => `${minimalConfig.messages} N°${++i}`)
}
