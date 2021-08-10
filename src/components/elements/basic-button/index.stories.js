import React from 'react'
// COMPONENTS
import BasicButton from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/button.enums.json'

export default {
  title: `${STORYBOOK_ROUTES.ELEMENTS}/Basic Button`,
  component: BasicButton,
  argTypes: {
    type: {
      options: buttonTypeEnums
    },
    color: {
      options: buttonColorEnums
    }
  },
  args: {
    type: 'submit',
    color: 'red',
    label: 'Minimal config button'
  }
}

const Template = args => <BasicButton {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = {
  isDisabled: true,
  label: 'Disabled Button'
}
