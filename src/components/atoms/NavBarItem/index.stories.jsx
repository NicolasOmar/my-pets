import React from 'react'
import NavBarItem from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// OTHER COMPONENTS
import TitleHeader from '../TitleHeader'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/NavbarItem`,
  component: NavBarItem,
  args: mocks.minimalConfig
}

const Template = args => <NavBarItem {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const LinkItem = Template.bind({})
LinkItem.storyName = 'As a link'
LinkItem.args = mocks.linkItem

export const WithChildren = Template.bind({})
WithChildren.storyName = 'With a "TitleHeader" component'
WithChildren.args = {
  title: 'Item without a child component',
  children: <TitleHeader titleText={'Child TitleHeader'} />
}
