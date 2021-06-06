import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
// GRAPHQL CLIENT
import { LOGIN } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// CONFIG OBJECTS
import { loginForm, loginFormHeader, loginButton, goToSignUpButton } from './login.config.json'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPER FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'

const LoginForm = () => {
  let history = useHistory()
  const [login, { loading, error }] = useMutation(LOGIN)

  useEffect(() => {
    getLoggedUser() && history.push(ROUTES.HOME)
    return () => {}
  }, [history])

  const onSubmitLogin = async formData => {
    login({
      variables: {
        ...formData,
        password: encryptPass(formData.password)
      }
    })
      .then(({ data }) => {
        setLoggedUser(data.loginUser)
        history.push(ROUTES.HOME)
      })
      .catch(error => console.error(error))
  }

  return (
    <GridLayout header={loginFormHeader}>
      <Form
        isLoading={loading}
        errors={error}
        formObject={loginForm}
        formButtons={{
          loginButton,
          goToSignUpButton: {
            ...goToSignUpButton,
            onClick: () => history.push(ROUTES.NEW_USER)
          }
        }}
        onFormSubmit={data => onSubmitLogin(data)}
      />
    </GridLayout>
  )
}

export default LoginForm
