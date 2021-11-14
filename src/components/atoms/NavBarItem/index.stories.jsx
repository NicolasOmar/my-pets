import React from 'react'
import NavBarItem from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from 'constants/routes.json'
// OTHER COMPONENTS
import Title from '../Title'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Navbar Item`,
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
WithChildren.storyName = 'With a "Title" component'
WithChildren.args = {
  title: 'Item without a child component',
  children: <Title titleText={'Child Title'} />
}
