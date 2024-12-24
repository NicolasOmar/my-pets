// CORE
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
import useFormikShape from './form'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
// INTERFACES
import { UserLoginPayload, UserLoginResponse } from '@interfaces/graphql'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// FUNCTIONS
import { encryptPass } from '@functions/encrypt'

interface LoginFormData {
  email: string
  password: string
}

const LoginForm = () => {
  let navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [login, { loading: isLoadingLogin, error: loginErrors, data }] = useMutation<
    UserLoginResponse,
    UserLoginPayload
  >(LOGIN_USER)

  const handleFormLoginSubmit = async (formData: LoginFormData) => {
    await login({
      variables: {
        payload: {
          email: formData.email,
          password: encryptPass(formData.password)
        }
      }
    })
  }

  const { loginFormik, formConfig } = useFormikShape(isLoadingLogin, handleFormLoginSubmit)

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

  const loginFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        type: 'submit',
        color: 'is-success',
        text: 'Log in',
        isDisabled: isLoadingLogin
      },
      {
        type: 'button',
        color: 'is-danger',
        text: 'You can Sign up',
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
          {loginFormButtons ? <ButtonGroup {...loginFormButtons} /> : null}
          {loginErrors ? (
            <Message headerText={'Login errors'} bodyText={loginErrors.message} color="is-danger" />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default LoginForm
