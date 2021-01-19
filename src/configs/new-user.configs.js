export const newUserFormBase = {
  name: {
    label: 'Name',
    type: 'text',
    control: 'name',
    isRequired: true,
    valid: true
  },
  lastName: {
    label: 'Last Name',
    type: 'text',
    control: 'lastName',
    isRequired: true,
    valid: true
  },
  userName: {
    label: 'User Name',
    type: 'text',
    control: 'userName',
    isRequired: true,
    valid: true
  },
  email: {
    label: 'Email',
    type: 'email',
    control: 'email',
    isRequired: true,
    valid: true
  },
  password: {
    label: 'Password',
    type: 'password',
    control: 'password',
    isRequired: true,
    valid: true
  },
  // repeatPass: {
  //   label: 'Repeat Password',
  //   type: 'password',
  //   control: 'repeatPass',
  //   isRequired: true,
  //   valid: true
  // },
}

export const newUserFormHeader = {
  title: 'Sign up'
}

export const signUpButton = {
  type: 'submit',
  label: 'Sign up'
}

export const goToLoginButton = {
  type: 'button',
  isBasic: true,
  color: 'red',
  label: 'Or you can log in with your account'
}