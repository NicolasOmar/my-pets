import Message from '.'
// CONSTANTS
import { notificationTypes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const messageStoryConfig = {
  msgType: {
    table: {
      type: {
        summary: parseListToStoryOptions(notificationTypes, true)
      }
    },
    options: parseObjKeys(notificationTypes)
  }
}

export default {
  title: 'MyPets/Atoms/Message',
  component: Message,
  argTypes: messageStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <Message {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WarningType = Template.bind({})
WarningType.storyName = 'Warning type'
WarningType.args = { msgType: 'warning' }

export const ErrorType = Template.bind({})
ErrorType.storyName = 'Error type'
ErrorType.args = { msgType: 'error' }

export const WithTitle = Template.bind({})
WithTitle.storyName = 'With a Title'
WithTitle.args = { ...Error.args, headerText: 'Message header' }

export const WithSeveralMessages = Template.bind({})
WithSeveralMessages.storyName = 'With a message list'
WithSeveralMessages.args = {
  ...WithTitle.args,
  messages: Array(5)
    .fill(null)
    .map((_, i) => `${testing.minimalConfig.messages} N°${++i}`)
}
