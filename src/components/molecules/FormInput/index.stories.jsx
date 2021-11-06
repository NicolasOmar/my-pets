import React from 'react'
import FormInput from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import { minimalConfig } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Form Input`,
  component: FormInput,
  args: minimalConfig
}

const Template = args => <FormInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Invalid = Template.bind({})
Invalid.storyName = 'Invalid case'
Invalid.args = {
  ...minimalConfig,
  inputConfig: {
    ...minimalConfig.inputConfig,
    isValid: false
  }
}
