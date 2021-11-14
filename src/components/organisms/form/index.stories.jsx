import React from 'react'
import Form from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import { minimalConfig, withButtons, withErrors } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ORGANISMS}/Form`,
  component: Form,
  args: minimalConfig
}

const Template = args => <Form {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithButtons = Template.bind({})
WithButtons.storyName = 'With buttons'
WithButtons.args = {
  ...Minimal.args,
  ...withButtons
}

export const DisabledButtons = Template.bind({})
DisabledButtons.storyName = 'With disabled buttons'
DisabledButtons.args = {
  ...WithButtons.args,
  formButtons: WithButtons.args.formButtons.map(button => ({ ...button, isDisabled: true }))
}

export const WithErrors = Template.bind({})
WithErrors.storyName = 'With form errors'
WithErrors.args = {
  ...WithButtons.args,
  ...withErrors,
  isLoading: false
}

export const FreeBoxed = Template.bind({})
FreeBoxed.storyName = 'Without box container'
FreeBoxed.args = {
  ...WithErrors.args,
  isBoxed: false
}
