import BasicRadioCheck from '.'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'
// FUNCTIONS
import { parseListToStoryOptions } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const basicRadioCheckStoryConfig = {
  type: {
    table: {
      type: {
        summary: parseListToStoryOptions(checkTypes)
      }
    },
    options: checkTypes
  }
}

export default {
  title: 'MyPets/Atoms/BasicRadioCheck',
  component: BasicRadioCheck,
  argTypes: basicRadioCheckStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <BasicRadioCheck {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const RadioWithLabel = Template.bind({})
RadioWithLabel.storyName = 'Radio with label'
RadioWithLabel.args = testing.radioWithLabel

export const RadioChecked = Template.bind({})
RadioChecked.storyName = 'Radio checked'
RadioChecked.args = testing.radioChecked

export const RadioDisabled = Template.bind({})
RadioDisabled.storyName = 'Radio disabled'
RadioDisabled.args = testing.radioDisabled

export const CheckWithLabel = Template.bind({})
CheckWithLabel.storyName = 'Checkbox with label'
CheckWithLabel.args = testing.checkWithLabel

export const CheckChecked = Template.bind({})
CheckChecked.storyName = 'Checkbox checked'
CheckChecked.args = testing.checkChecked

export const CheckDisabled = Template.bind({})
CheckDisabled.storyName = 'Checkbox Disabled'
CheckDisabled.args = testing.checkDisabled
