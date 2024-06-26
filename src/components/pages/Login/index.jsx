import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { setLoggedUser } from '../../../functions/local-storage'

const { inputs, header, loginButton, goToSignUpButton } = CONFIG
const { APP_ROUTES } = ROUTES

const Login = () => {
  let navigate = useNavigate()
  const { userData, setUserData } = useContext(UserContext)
  const [login, { loading, error, data }] = useMutation(LOGIN)

  useEffect(() => {
    userData && navigate(APP_ROUTES.HOME)
    return () => {}
  }, [navigate, userData])

  useEffect(() => {
    if (data) {
      setLoggedUser(data.loginUser)
      setUserData(data.loginUser)
      navigate(APP_ROUTES.HOME)
    }
  }, [data, setUserData, navigate])

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

export default Login
