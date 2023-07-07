import Divider from '.'
// CONSTANTS
import { textColors } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { buildArgTypes, parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

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
  argTypes: buildArgTypes(storybook, dividerStoryConfig)
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
CustomStyle.storyName = 'Custom Style'
CustomStyle.args = {
  ...Dark.args,
  ...testing.customStyle
}
