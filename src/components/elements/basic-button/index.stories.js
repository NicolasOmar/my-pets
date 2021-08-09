import React from 'react'
// COMPONENTS
import BasicButton from '.'

export default {
  title: 'MyPets/Elements/Basic Button',
  component: BasicButton
}

const Template = args => <BasicButton {...args} />

export const BasicButtonStory = Template.bind({})

BasicButtonStory.storyName = 'Red'
BasicButtonStory.args = {
  type: 'submit',
  color: 'red',
  isDisabled: null,
  label: 'First BasicButton Story'
}
