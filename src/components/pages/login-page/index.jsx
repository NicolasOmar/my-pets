import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/form-template'
// FORM CONFIG
import { inputs, header, loginButton, goToSignUpButton } from './index.config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'

const LoginPage = () => {
  let history = useHistory()
  const [login, { loading, error }] = useMutation(LOGIN)
  const dispatch = useDispatch()

  useEffect(() => {
    getLoggedUser() && history.push(APP_ROUTES.HOME)
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
        history.push(APP_ROUTES.HOME)
      })
      .catch(error => console.error(error))
  }

  return (
    <FormTemplate
      header={header}
      isLoading={loading}
      errors={error}
      inputs={inputs}
      formButtons={[
        loginButton,
        {
          ...goToSignUpButton,
          onClick: () => history.push(APP_ROUTES.NEW_USER)
        }
      ]}
      buttonsGrouped={true}
      onFormSubmit={data => onSubmitLogin(data)}
    />
  )
}

export default LoginPage
