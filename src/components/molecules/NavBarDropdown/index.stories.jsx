import React from 'react'
import NavBarDropdown from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Navbar Dropdown`,
  component: NavBarDropdown,
  args: mocks.minimalConfig
}

const Template = args => <NavBarDropdown {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithOneItem = Template.bind({})
WithOneItem.storyName = 'With 1 item'
WithOneItem.args = mocks.withOneItem

export const WithSeveralItems = Template.bind({})
WithSeveralItems.storyName = 'With several items'
WithSeveralItems.args = {
  ...mocks.withSeveralItems,
  options: new Array(7).fill(null).map((_, i) => ({ itemLabel: `Option N°${++i}` }))
}
