import RadioCheckGroup from '.'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'
// FUNCTIONS
// MOCKS
import { testing } from './index.mocks.json'

const radioCheckGroupStoryConfig = {
  type: {
    options: checkTypes
  }
}

export default {
  title: 'MyPets/Molecules/RadioCheckGroup',
  component: RadioCheckGroup,
  argTypes: radioCheckGroupStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <RadioCheckGroup {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const UsingCheckbox = Template.bind({})
UsingCheckbox.storyName = 'Using checkbox'
UsingCheckbox.args = {
  ...Minimal.args,
  type: 'checkbox',
  options: testing.minimalConfig.options.map(item => ({ ...item, type: 'checkbox' }))
}
