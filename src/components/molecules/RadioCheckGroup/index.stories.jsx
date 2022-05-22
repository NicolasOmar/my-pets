import React from 'react'
import RadioCheckGroup from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/RadioCheckGroup`,
  component: RadioCheckGroup,
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
