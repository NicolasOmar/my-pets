import Notification from '.'
// CONSTANTS
import { colors } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const notificationStoryConfig = {
  color: {
    table: {
      type: {
        summary: parseListToStoryOptions(colors, true)
      },
      defaultValue: {
        summary: parseObjKeys(colors)[0]
      }
    },
    options: parseObjKeys(colors)
  }
}

export default {
  title: 'MyPets/Molecules/Notification',
  component: Notification,
  argTypes: notificationStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <Notification {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Colored = Template.bind({})
Colored.args = {
  color: 'primary'
}

export const LightColored = Template.bind({})
LightColored.args = {
  ...Colored.args,
  isLightColor: true
}
