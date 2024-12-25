// CORE
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
import useLoginFormik from './form'
// INTERFACES
import { UserLoginPayload, UserLoginResponse } from '@interfaces/graphql'
import { LoginFormData } from '@interfaces/forms'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { LOGIN_FORM_LABELS } from '@constants/forms'
// FUNCTIONS
import { encryptPass } from '@functions/encrypt'

const LoginForm = () => {
  let navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [login, { loading: isLoadingLogin, error: loginErrors, data }] = useMutation<
    UserLoginResponse,
    UserLoginPayload
  >(LOGIN_USER)

  const handleSubmit = async (formData: LoginFormData) => {
    await login({
      variables: {
        payload: {
          email: formData.email,
          password: encryptPass(formData.password)
        }
      }
    })
  }

  const { loginFormik, formConfig } = useLoginFormik(isLoadingLogin, handleSubmit)

  const loginFormHeader: TitleProps = {
    main: {
      text: LOGIN_FORM_LABELS.TITLE,
      type: 'title'
    },
    secondary: {
      text: LOGIN_FORM_LABELS.SUBTITLE,
      type: 'subtitle'
    }
  }

  const loginFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        text: LOGIN_FORM_LABELS.SUBMIT_BTN,
        type: 'submit',
        color: 'is-success',
        isDisabled: isLoadingLogin
      },
      {
        text: LOGIN_FORM_LABELS.SIGN_UP_BTN,
        type: 'button',
        color: 'is-danger',
        isDisabled: isLoadingLogin,
        onClick: () => navigate(APP_ROUTES.NEW_USER)
      }
    ]
  }

  useEffect(() => {
    if (data) {
      const userFullName = data.loginUser.loggedUser
        ? `${data.loginUser.loggedUser.name} ${data.loginUser.loggedUser.lastName}`
        : null
      userFullName && userContext?.setUserData({ name: userFullName })
      navigate(APP_ROUTES.HOME)
    }
  }, [data])

  useEffect(() => {
    userContext?.userData && navigate(APP_ROUTES.HOME)
    return () => {}
  }, [navigate, userContext])

  return (
    <Column size="is-8" offset="is-offset-2">
      <Box>
        <Title {...loginFormHeader} />

        <form onSubmit={loginFormik.handleSubmit}>
          <FormField {...formConfig.email} />
          <FormField {...formConfig.password} />

          <ButtonGroup {...loginFormButtons} />

          {loginErrors ? (
            <Message
              headerText={LOGIN_FORM_LABELS.ERROR_MSG}
              bodyText={loginErrors.message}
              color="is-danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default LoginForm
