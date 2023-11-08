import FormTemplate from '.'
// CONFIG AS MOCK
import LoginPageConfig from '../../pages/Login/config.json'
import NewUserPageConfig from '../../pages/NewUser/config.json'
import AddPetPageConfig from '../../pages/AddPet/config.json'
// MOCKS
import { storybook } from './index.mocks.json'

export default {
  title: 'MyPets/Templates/FormTemplate',
  component: FormTemplate,
  argTypes: storybook,
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

export const AddPetExtample = Template.bind({})
AddPetExtample.storyName = 'App Pet'
AddPetExtample.args = {
  ...AddPetPageConfig,
  formButtons: [AddPetPageConfig.addPetButton, AddPetPageConfig.goToHomeButton]
}
