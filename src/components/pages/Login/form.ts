import { InputProps } from "@interfaces/components";
import { TitleProps } from "reactive-bulma/dist/interfaces/atomProps";
import { ButtonGroupProps } from "reactive-bulma/dist/interfaces/moleculeProps";

export const LoginFormHeader: TitleProps = {
  main: {
    text: 'Welcome to My Pets',
    type: 'title'
  },
  secondary: {
    text: 'Log in',
    type: 'subtitle'
  }
}

export const LoginFormInputs: InputProps = {
  email: {
    labelText: "Email",
    inputControlConfig: {
      inputConfig: {
        type: "email"
      }
    }
  },
  password: {
    labelText: "Password",
    inputControlConfig: {
      inputConfig: {
        type: "password"
      }
    }
  }
}

export const LoginFormButtons: ButtonGroupProps = {
  buttonList: [
    {
      type: "submit",
      color: "is-success",
      text: "Log in"
    },
    {
      type: "button",
      color: "is-danger",
      text: "You can Sign up"
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