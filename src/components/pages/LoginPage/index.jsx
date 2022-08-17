import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { inputs, header, loginButton, goToSignUpButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'

const LoginPage = () => {
  let navigate = useNavigate()
  const [login, { loading, error, data }] = useMutation(LOGIN)
  const dispatch = useDispatch()

  useEffect(() => getLoggedUser() && navigate(APP_ROUTES.HOME), [navigate])
  useEffect(() => {
    if (data) {
      setLoggedUser(data.loginUser)
      dispatch({
        type: 'LOGIN',
        payload: data.loginUser
      })
      navigate(APP_ROUTES.HOME)
    }
  }, [data, dispatch, navigate])

  const onSubmitLogin = async formData => {
    await login({
      variables: {
        ...formData,
        password: encryptPass(formData.password)
      }
    })
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
          onClick: () => navigate(APP_ROUTES.NEW_USER)
        }
      ]}
      onFormSubmit={data => onSubmitLogin(data)}
    />
  )
}

export default LoginPage
