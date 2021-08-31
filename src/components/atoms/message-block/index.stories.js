import MessageBlock from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// ENUMS
import { messageTypes } from '../../../enums/type.enums.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Message Block`,
  component: MessageBlock,
  argTypes: {
    msgType: {
      options: messageTypes
    }
  },
  args: {
    msgType: 'error',
    errors: 'first error'
  }
}

const Template = args => <MessageBlock {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
