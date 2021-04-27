import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
// GRAPHQL CLIENT
import { LOGIN } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// CONFIG OBJECTS
import {
  loginForm,
  loginFormHeader,
  loginButton,
  goToSignUpButton
} from '../../../configs/login.configs.json'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPER FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'
// import { checkEmptyValues, checkFormValidation } from '../../../functions/methods'

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
        isLoading={result.loading}
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
