import RadioCheckGroup from '.'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'
// FUNCTIONS
import { buildArgTypes } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

const radioCheckGroupStoryConfig = {
  type: {
    options: checkTypes
  }
}

export default {
  title: 'MyPets/Molecules/RadioCheckGroup',
  component: RadioCheckGroup,
  argTypes: buildArgTypes(storybook, radioCheckGroupStoryConfig),
  args: testing.minimalConfig
}

const Template = args => <RadioCheckGroup {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const UsingCheckbox = Template.bind({})
UsingCheckbox.storyName = 'Using checkbox'
UsingCheckbox.args = {
  ...Minimal.args,
  options: testing.minimalConfig.options.map(item => ({ ...item, type: 'checkbox' }))
}
