import React from 'react'
import Icon from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
// MOCKS

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Icon`,
  component: Icon
}

const Template = args => <Icon {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
