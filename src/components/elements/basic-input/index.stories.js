import React from 'react'
import BasicInput from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// ENUMS
import { inputTypeEnums } from '../../../enums/input.enums.json'

export default {
  title: `${STORYBOOK_ROUTES.ELEMENTS}/Basic Input`,
  component: BasicInput,
  argTypes: {
    type: {
      options: inputTypeEnums
    }
  },
  args: {
    type: 'text',
    control: 'basicInputControl'
  }
}

const Template = args => <BasicInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Password = Template.bind({})
Password.storyName = 'Password'
Password.args = {
  type: 'password'
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.storyName = 'With Placeholder'
WithPlaceholder.args = {
  placeHolder: 'Hi!'
}

export const ValueAndPlaceholder = Template.bind({})
ValueAndPlaceholder.storyName = 'Value & Placeholder'
ValueAndPlaceholder.args = {
  value: 'Hello!',
  placeHolder: 'Nice to see you again'
}

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = {
  isDisabled: true
}
