import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// GRAPHQL
import { LOGIN } from '../../../graphql/mutations'
// MODELS
import {
  loginForm,
  loginFormHeader,
  loginButton,
  goToSignUpButton
} from '../../../configs/login.configs'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPERS
import { encryptPass } from '../../../helpers/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../helpers/local-storage'
// import { checkEmptyValues, checkFormValidation } from '../../../helpers/methods'

const LoginForm = () => {
  let history = useHistory()
  const [login, result] = useMutation(LOGIN)
  // const [hasErrors, setHasErrors] = useState(false)
  // const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    getLoggedUser() && history.push(ROUTES.HOME)
    return () => {}
  }, [history])

  // useEffect(() => {
  //   const hasEmptyValues = checkEmptyValues(formObject)
  //   const isValidForm = checkFormValidation(formObject)

  //   setHasErrors(!isValidForm || !hasEmptyValues)
  //   !isValidForm && setErrorMsg('The form needs to fill required fields')
  //   return () => {}
  // }, [formObject])

  // const renderErrorMsg = () => {
  //   return hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null
  // }

  const onSubmitLogin = async data => {
    login({
      variables: {
        ...data,
        password: encryptPass(data.password)
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
        isLoading={result.loading}
        formObject={loginForm}
        formButtons={[
          loginButton,
          {
            ...goToSignUpButton,
            onClick: () => history.push(ROUTES.NEW_USER)
          }
        ]}
        onFormSubmit={data => onSubmitLogin(data)}
      />
    </GridLayout>
  )
}

export default LoginForm
