import React from 'react'
import MenuItem from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Menu Item`,
  component: MenuItem,
  args: {
    label: 'Minimal config Menu Item'
  }
}

const Template = args => <MenuItem {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
