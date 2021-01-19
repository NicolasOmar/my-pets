import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// SEMANTIC REACT
import { Form, Segment, Message } from 'semantic-ui-react'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import FormInput from '../../shared/form-input/form-input'
import FormButton from '../../shared/form-button/form-button'
// API
import USERSAPI from '../../../api/users.api'
// MODELS
import { loginButton, loginForm, loginFormHeader, signUpButton } from '../../../models/login-form'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPERS
import { encryptPass } from '../../../helpers/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../helpers/local-storage'
import { checkFormValidation } from '../../../helpers/methods'

const LoginForm = () => {
  let history = useHistory()
  const [loggedUser] = useState(getLoggedUser())
  const [formObject, setFormObject] = useState(loginForm)
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setHasErrors(!checkFormValidation(formObject))
    return () => {}
  }, [formObject])

  useEffect(() => {
    loggedUser && history.push(ROUTES.HOME)
    return () => {}
  }, [loggedUser, history])

  const onInputChange = (evt, prop) => {
    const { value } = evt.target
    const isValidValue = value !== ''

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        value: isValidValue ? value : null,
      },
    })
  }

  const onSubmitLogin = async () => {
    if (hasErrors) {
      return
    }

    setLoading(true)

    const payload = {
      email: formObject.email.value,
      password: encryptPass(formObject.password.value),
    }
    const { data, message } = await USERSAPI.LOGIN(payload)

    setLoading(false)

    if (data) {
      setLoggedUser({
        token: data.token,
        ...data.userLogged,
      })

      history.push(ROUTES.HOME)
    } else {
      setHasErrors(true)
      setErrorMsg(message)
    }
  }

  const checkValidation = (prop) => {
    const valid = formObject[prop].value !== null

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        valid,
      },
    })
  }

  const renderErrorMsg = () => {
    return <Message error header="Oops" content={errorMsg} />
  }

  return (
    <GridLayout header={loginFormHeader}>
      <Segment>
        <Form error={hasErrors} loading={loading} onSubmit={onSubmitLogin}>
          {Object.keys(formObject).map((prop, i) => {
            return (
              <FormInput
                key={`${prop}${i}`}
                config={{
                  ...formObject[prop],
                  onInputChange,
                  onBlurChange: checkValidation,
                }}
              />
            )
          })}

          <FormButton config={loginButton} />
          <FormButton
            config={{
              ...signUpButton,
              onClick: () => history.push(ROUTES.NEW_USER),
            }}
          />

          {hasErrors && renderErrorMsg()}
        </Form>
      </Segment>
    </GridLayout>
  )
}

export default LoginForm
