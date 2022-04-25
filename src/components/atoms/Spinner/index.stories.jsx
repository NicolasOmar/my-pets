import React from 'react'
import Spinner from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Spinner`,
  component: Spinner
}

const Template = args => <Spinner {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const BigSize = Template.bind({})
BigSize.storyName = 'Big Size'
BigSize.args = mocks.bigSize

export const SmallWheel = Template.bind({})
SmallWheel.storyName = 'Small Size Wheel'
SmallWheel.args = mocks.smallWheel

export const SlowAnimation = Template.bind({})
SlowAnimation.storyName = 'Slow Animation'
SlowAnimation.args = mocks.slowAnimation

export const FastAnimation = Template.bind({})
FastAnimation.storyName = 'Fast Animation'
FastAnimation.args = mocks.fastAnimation
