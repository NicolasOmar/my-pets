import FormTemplate from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONFIG AS MOCK
import LoginPageConfigMock from '../../pages/login-page/index.config.json'
import NewUserPageConfigMock from '../../pages/new-user-page/new-user.config.json'
import UpdateUserPageConfigMock from '../../pages/update-user-page/update-user.config.json'
import UpdatePassPageConfigMock from '../../pages/new-user-page/new-user.config.json'

export default {
  title: `${STORYBOOK_ROUTES.TEMPLATES}/Form Template`,
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
  formButtons: [UpdatePassPageConfigMock.signUpButton, UpdatePassPageConfigMock.goToLoginButton]
}
