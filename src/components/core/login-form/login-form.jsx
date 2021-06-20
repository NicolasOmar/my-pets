import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { LOGIN } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// FORM CONFIG
import { inputs, header, loginButton, goToSignUpButton } from './login.config.json'
// CONSTANTS
import { ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'

const LoginForm = () => {
  let history = useHistory()
  const [login, { loading, error }] = useMutation(LOGIN)
  const dispatch = useDispatch()

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
        dispatch({
          type: 'LOGIN',
          payload: data.loginUser
        })
        history.push(ROUTES.HOME)
      })
      .catch(error => console.error(error))
  }

  return (
    <GridLayout header={header}>
      <Form
        isLoading={loading}
        errors={error}
        formObject={inputs}
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
