import React from 'react'
import Icon from '.'
// CONSTANTS
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: 'MyPets/Atoms/Icon',
  component: Icon
}

const Template = args => <Icon {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const CustomWithSrc = Template.bind({})
CustomWithSrc.storyName = 'Custom with soruce icon'
CustomWithSrc.args = mocks.ghostSrc

export const CustomWithTitle = Template.bind({})
CustomWithTitle.storyName = 'Custom with title'
CustomWithTitle.args = {
  ...mocks.ghostSrc,
  alt: 'Passed Away'
}

export const WithBigSize = Template.bind({})
WithBigSize.storyName = 'Custom with big size'
WithBigSize.args = {
  ...mocks.ghostSrc,
  size: 90
}
