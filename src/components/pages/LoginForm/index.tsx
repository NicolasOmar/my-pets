// CORE
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// GRAPHQL
import { useMutation } from '@apollo/client'
import { LOGIN } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
// INTERFACES
import { InputProps } from '@interfaces/components'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// FUNCTIONS
import { encryptPass } from '@functions/encrypt'
import { setLoggedUser } from '@functions/local-storage'

const LoginForm = () => {
  let navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [login, { loading: isLoadingLogin, error: loginErrors, data }] = useMutation(LOGIN)

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async formData => {
      console.warn(formData)
      await login({
        variables: {
          ...formData,
          password: encryptPass(formData.password)
        }
      })
    },
    enableReinitialize: true
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
          value: loginFormik.values.email,
          isDisabled: isLoadingLogin,
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
          value: loginFormik.values.password,
          isDisabled: isLoadingLogin,
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
    userContext?.userData && navigate(APP_ROUTES.HOME)
    return () => {}
  }, [navigate, userContext])

  useEffect(() => {
    if (data) {
      setLoggedUser(data.loginUser)
      userContext?.setUserData(data.loginUser)
      navigate(APP_ROUTES.HOME)
    }
  }, [data, userContext, navigate])

  return (
    <Column size="is-8" offset="is-offset-2">
      <Box>
        <Title {...loginFormHeader} />

        <form onSubmit={loginFormik.handleSubmit}>
          <FormField {...loginFormInputs.email} />
          <FormField {...loginFormInputs.password} />
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
