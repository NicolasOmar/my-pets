import React from 'react'
import MenuDropdown from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import { minimalConfig } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Menu Dropdown`,
  component: MenuDropdown,
  args: minimalConfig
}

const Template = args => <MenuDropdown {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const ManyOptions = Template.bind({})
ManyOptions.storyName = 'Many options'
ManyOptions.args = {
  menuLabel: minimalConfig.menuLabel,
  options: new Array(7).fill(null).map((_, i) => ({ label: `Option N°${++i}` }))
}
