import React from 'react'
import BasicRadioCheck from '.'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: 'MyPets/Atoms/BasicRadioCheck',
  component: BasicRadioCheck,
  argTypes: {
    type: {
      options: checkTypes
    }
  },
  args: mocks.minimalConfig
}

const Template = args => <BasicRadioCheck {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const RadioWithLabel = Template.bind({})
RadioWithLabel.storyName = 'Radio with label'
RadioWithLabel.args = mocks.radioWithLabel

export const RadioChecked = Template.bind({})
RadioChecked.storyName = 'Radio checked'
RadioChecked.args = mocks.radioChecked

export const RadioDisabled = Template.bind({})
RadioDisabled.storyName = 'Radio disabled'
RadioDisabled.args = mocks.radioDisabled

export const CheckWithLabel = Template.bind({})
CheckWithLabel.storyName = 'Checkbox with label'
CheckWithLabel.args = mocks.checkWithLabel

export const CheckChecked = Template.bind({})
CheckChecked.storyName = 'Checkbox checked'
CheckChecked.args = mocks.checkChecked

export const CheckDisabled = Template.bind({})
CheckDisabled.storyName = 'Checkbox Disabled'
CheckDisabled.args = mocks.checkDisabled
