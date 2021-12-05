import React from 'react'
import FormInput from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import { minimalConfig, loading } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/FormInput`,
  component: FormInput,
  args: minimalConfig
}

const Template = args => <FormInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Loading = Template.bind({})
Loading.storyName = 'Loading'
Loading.args = {
  ...Minimal.args,
  ...loading
}

export const Invalid = Template.bind({})
Invalid.storyName = 'Invalid'
Invalid.args = {
  ...minimalConfig,
  inputConfig: {
    ...minimalConfig.inputConfig,
    isValid: false
  }
}
