import Divider from '.'
// CONSTANTS
import { textColors } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const dividerStoryConfig = {
  color: {
    table: {
      type: {
        summary: parseListToStoryOptions(textColors, true)
      },
      defaultValue: {
        summary: parseObjKeys(textColors)[3]
      }
    },
    options: parseObjKeys(textColors)
  }
}

export default {
  title: 'MyPets/Atoms/Divider',
  component: Divider,
  argTypes: dividerStoryConfig
}

const Template = args => <Divider {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Light = Template.bind({})
Light.storyName = 'Light color'
Light.args = testing.lightColored

export const Dark = Template.bind({})
Dark.storyName = 'Dark color'
Dark.args = testing.darkColored

export const CustomStyle = Template.bind({})
CustomStyle.args = {
  ...Dark.args,
  ...testing.customStyle
}
