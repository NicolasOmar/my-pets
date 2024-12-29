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
import { UserLoginResponse, UserLoginPayload } from '@interfaces/graphql'
import { LoginFormData } from '@interfaces/forms'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { LOGIN_FORM_LABELS } from '@constants/forms'
// FUNCTIONS
import { encryptPass } from '@functions/encrypt'
import { setLoggedUser } from '@functions/local-storage'

const LoginForm: React.FC = () => {
  let navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [login, { loading: isWorkingOnLogin, data: loginData, error: loginErrors }] = useMutation<
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

  const { loginFormik, formConfig } = useLoginFormik(isWorkingOnLogin, handleSubmit)

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
        isDisabled: isWorkingOnLogin
      },
      {
        text: LOGIN_FORM_LABELS.SIGN_UP_BTN,
        type: 'button',
        color: 'is-danger',
        isDisabled: isWorkingOnLogin,
        onClick: () => navigate(APP_ROUTES.USER_FORM)
      }
    ]
  }

  useEffect(() => {
    if (loginData) {
      const userFullName = `${loginData.loginUser.loggedUser.name} ${loginData.loginUser.loggedUser.lastName}`

      userContext?.setUserData({ name: userFullName })
      setLoggedUser({
        ...loginData.loginUser.loggedUser,
        token: loginData.loginUser.token
      })

      navigate(APP_ROUTES.HOME)
    }
  }, [loginData])

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
              headerText={LOGIN_FORM_LABELS.ERROR_TITLE}
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
