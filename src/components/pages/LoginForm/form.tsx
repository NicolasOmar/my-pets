import { InputProps } from '@interfaces/components'
import { useFormik } from 'formik'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'

const loginFormik = useFormik({
  initialValues: {
    email: '',
    password: ''
  },
  onSubmit: formData => console.warn(formData)
})

const loginFormHeader: TitleProps = {
  main: {
    text: 'Welcome to My Pets',
    type: 'title'
  },
  secondary: {
    text: 'Log in',
    type: 'subtitle'
  }
}

const loginFormInputs: InputProps = {
  email: {
    labelText: 'Email',
    inputControlConfig: {
      inputConfig: {
        type: 'email',
        name: 'email',
        onChange: loginFormik.handleChange
      }
    }
  },
  password: {
    labelText: 'Password',
    inputControlConfig: {
      inputConfig: {
        type: 'password',
        name: 'password',
        onChange: loginFormik.handleChange
      }
    }
  }
}

const loginFormButtons: ButtonGroupProps = {
  buttonList: [
    {
      type: 'submit',
      color: 'is-success',
      text: 'Log in'
    },
    {
      type: 'button',
      color: 'is-danger',
      text: 'You can Sign up'
    }
  ]
}

// check
// "icon": {
//   "isCustom": false,
//     "iconLabel": "cat",
//       "style": {
//     "fontSize": "5rem"
//   },
//   "containerStyle": {
//     "display": "table",
//       "margin": "2rem auto 0 auto"
//   }
// }

const useLoginForm = () => ({
  loginFormik,
  loginFormHeader,
  loginFormInputs,
  loginFormButtons
})

export default useLoginForm
