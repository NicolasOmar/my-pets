import MessageBlock from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// ENUMS
import { messageTypes } from '../../../enums/type.enums.json'
// MOCKS
import { minimalConfig } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Message Block`,
  component: MessageBlock,
  argTypes: {
    msgType: {
      options: messageTypes
    }
  },
  args: minimalConfig
}

const Template = args => <MessageBlock {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Warning = Template.bind({})
Warning.storyName = 'Warning'
Warning.args = { msgType: 'warning' }

export const Error = Template.bind({})
Error.storyName = 'Error'
Error.args = { msgType: 'error' }

export const WithTitle = Template.bind({})
WithTitle.storyName = 'With a title'
WithTitle.args = { ...Error.args, header: 'Message header' }

export const WithSeveralMessages = Template.bind({})
WithSeveralMessages.storyName = 'With a message list'
WithSeveralMessages.args = {
  ...WithTitle.args,
  errors: Array(5)
    .fill(null)
    .map((_, i) => `${minimalConfig.errors} N°${++i}`)
}
