import React from 'react'
import Title from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from 'constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Title`,
  component: Title,
  args: mocks.minimalConfig
}

const Template = args => <Title {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const MainAndSub = Template.bind({})
MainAndSub.storyName = 'Main and Sub titles'
MainAndSub.args = {
  ...Minimal.args,
  ...mocks.titleWithSubTitle
}

export const BigSize = Template.bind({})
BigSize.storyName = 'Big Size'
BigSize.args = mocks.bigSize

export const SmallSize = Template.bind({})
SmallSize.storyName = 'Small Size'
SmallSize.args = mocks.smallSize
