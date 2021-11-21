import React from 'react'
import FormTemplate from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONFIG AS MOCK
import LoginPageConfigMock from '../../pages/LoginPage/config.json'
import NewUserPageConfigMock from '../../pages/NewUserPage/config.json'
import UpdateUserPageConfigMock from '../../pages/UpdateUserPage/config.json'
import UpdatePassPageConfigMock from '../../pages/UpdatePassPage/config.json'

export default {
  title: `${STORYBOOK_ROUTES.TEMPLATES}/FormLayoutTemplate`,
  component: FormTemplate,
  args: {
    ...LoginPageConfigMock,
    formButtons: [LoginPageConfigMock.loginButton, LoginPageConfigMock.goToSignUpButton]
  }
}

const Template = args => <FormTemplate {...args} />

export const LoginExample = Template.bind({})
LoginExample.storyName = 'Login'

export const NewUserExample = Template.bind({})
NewUserExample.storyName = 'New User'
NewUserExample.args = {
  ...NewUserPageConfigMock,
  formButtons: [NewUserPageConfigMock.signUpButton, NewUserPageConfigMock.goToLoginButton]
}

export const UpdateUserExample = Template.bind({})
UpdateUserExample.storyName = 'Update User'
UpdateUserExample.args = {
  ...UpdateUserPageConfigMock,
  formButtons: [UpdateUserPageConfigMock.saveButton, UpdateUserPageConfigMock.goBackButton]
}

export const UpdatePassExample = Template.bind({})
UpdatePassExample.storyName = 'Update Password'
UpdatePassExample.args = {
  ...UpdatePassPageConfigMock,
  formButtons: [UpdatePassPageConfigMock.updateButton, UpdatePassPageConfigMock.cancelButton]
}
