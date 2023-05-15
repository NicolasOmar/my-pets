import React from 'react'
import RadioCheckGroup from '.'
// CONSTANTS
import { checkTypes } from '../../../constants/tag-types.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: 'MyPets/Molecules/RadioCheckGroup',
  component: RadioCheckGroup,
  argTypes: {
    type: {
      options: checkTypes
    }
  },
  args: mocks.minimalConfig
}

const Template = args => <RadioCheckGroup {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const UsingCheckbox = Template.bind({})
UsingCheckbox.storyName = 'Using checkbox'
UsingCheckbox.args = {
  ...Minimal.args,
  options: mocks.minimalConfig.options.map(item => ({ ...item, type: 'checkbox' }))
}
