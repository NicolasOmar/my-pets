import FormInput from '.'
// MOCKS
import { testing } from './index.mocks.json'
// FUNCTIONS
import { parseListToStoryOptions } from '../../../functions/parsers'

const formInputStoryConfig = {
  inputConfig: {
    table: {
      type: {
        summary: parseListToStoryOptions(['BasicInput', 'RadioCheckGroup', 'BasicSelect'])
      }
    }
  }
}

export default {
  title: 'MyPets/Molecules/FormInput',
  component: FormInput,
  argTypes: formInputStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <FormInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Loading = Template.bind({})
Loading.storyName = 'Loading'
Loading.args = testing.loading

export const Invalid = Template.bind({})
Invalid.storyName = 'Invalid'
Invalid.args = {
  inputConfig: {
    ...testing.minimalConfig.inputConfig,
    isValid: false
  }
}

export const Select = Template.bind({})
Select.storyName = 'Select config'
Select.args = testing.selectConfig

export const CheckGroup = Template.bind({})
CheckGroup.storyName = 'CheckGroup config'
CheckGroup.args = testing.checkGroupConfig
