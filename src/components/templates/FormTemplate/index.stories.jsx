import React from 'react'
import FormTemplate from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONFIG AS MOCK
import LoginPageConfig from '../../pages/Login/config.json'
import NewUserPageConfig from '../../pages/NewUser/config.json'
import UpdateUserPageConfig from '../../pages/UpdateUser/config.json'
import UpdatePassPageConfig from '../../pages/UpdatePassword/config.json'
import AddPetPageConfig from '../../pages/AddPet/config.json'

export default {
  title: `${STORYBOOK_ROUTES.TEMPLATES}/FormTemplate`,
  component: FormTemplate,
  args: {
    ...LoginPageConfig,
    formButtons: [LoginPageConfig.loginButton, LoginPageConfig.goToSignUpButton]
  }
}

const Template = args => <FormTemplate {...args} />

export const LoginExample = Template.bind({})
LoginExample.storyName = 'Login'

export const NewUserExample = Template.bind({})
NewUserExample.storyName = 'New User'
NewUserExample.args = {
  ...NewUserPageConfig,
  formButtons: [NewUserPageConfig.signUpButton, NewUserPageConfig.goToLoginButton]
}

export const UpdateUserExample = Template.bind({})
UpdateUserExample.storyName = 'Update User'
UpdateUserExample.args = {
  ...UpdateUserPageConfig,
  formButtons: [UpdateUserPageConfig.saveButton, UpdateUserPageConfig.goBackButton]
}

export const UpdatePassExample = Template.bind({})
UpdatePassExample.storyName = 'Update Password'
UpdatePassExample.args = {
  ...UpdatePassPageConfig,
  formButtons: [UpdatePassPageConfig.updateButton, UpdatePassPageConfig.cancelButton]
}

export const AddPetExtample = Template.bind({})
AddPetExtample.storyName = 'App Pet'
AddPetExtample.args = {
  ...AddPetPageConfig,
  formButtons: [AddPetPageConfig.addPetButton, AddPetPageConfig.goToHomeButton]
}
