import React from 'react'
import FormInput from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/FormInput`,
  component: FormInput,
  args: mocks.minimalConfig
}

const Template = args => <FormInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Loading = Template.bind({})
Loading.storyName = 'Loading'
Loading.args = mocks.loading

export const Invalid = Template.bind({})
Invalid.storyName = 'Invalid'
Invalid.args = {
  inputConfig: {
    ...mocks.minimalConfig.inputConfig,
    isValid: false
  }
}

export const Select = Template.bind({})
Select.storyName = 'Select config'
Select.args = mocks.selectConfig

export const CheckGroup = Template.bind({})
CheckGroup.storyName = 'CheckGroup config'
CheckGroup.args = mocks.checkGroupConfig
