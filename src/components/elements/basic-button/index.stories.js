import React from 'react'
// COMPONENTS
import BasicButton from '.'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/buttons.enum.json'

export default {
  title: 'MyPets/Elements/Basic Button',
  component: BasicButton,
  argTypes: {
    type: {
      options: buttonTypeEnums
    },
    color: {
      options: buttonColorEnums
    }
  }
}

const Template = args => <BasicButton {...args} />

export const NormalRed = Template.bind({})

NormalRed.storyName = 'Normal Red'
NormalRed.args = {
  type: 'submit',
  color: 'red',
  isDisabled: null,
  label: 'Normal Red Button'
}

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled Red'
Disabled.args = {
  ...NormalRed.args,
  isDisabled: true,
  label: 'Disabled Red Button'
}
