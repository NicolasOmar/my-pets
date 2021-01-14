import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// SEMANTIC REACT
import { Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
// CONSTANTS
import API from '../../constants/api-routes'
import ROUTES from '../../constants/app-routes'
// MODELS
import { loginFormBase, loginFormHeader } from '../../models/login-form'
// HELPERS
import { encryptPass } from '../../helpers/encrypt'
import { setLoggedUser } from '../../helpers/local-storage'
import { checkFormValidation } from '../../helpers/methods'

const LoginForm = () => {
  let history = useHistory()
  const [header] = useState(loginFormHeader)
  const [formObject, setFormObject] = useState({ ...loginFormBase })
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setHasErrors(!checkFormValidation(formObject))
    return () => {}
  }, [formObject])

  const onFormChange = (evt, prop) => {
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

  const sendTo = (route) => history.push(route)

  const onSubmitForm = async () => {
    if (hasErrors) {
      return
    }

    setLoading(true)

    const payload = {
      email: formObject.email.value,
      password: encryptPass(formObject.password.value),
    }

    try {
      const response = await axios.post(API.LOGIN, payload)

      setLoggedUser({
        token: response.data.token,
        ...response.data.userLogged,
      })
      sendTo(ROUTES.HOME)
    } catch (e) {
      setHasErrors(true)
      setErrorMsg(e.message)
    } finally {
      setLoading(false)
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
    <div>
      <Header as="h1" textAlign={header.align}>
        {header.header}
        <Header.Subheader>{header.subHeader}</Header.Subheader>
      </Header>

      <Grid centered>
        <Grid.Column width={8}>
          <Segment>
            <Form error={hasErrors} loading={loading} onSubmit={() => onSubmitForm()}>
              <Form.Input
                label={formObject.email.label}
                type={formObject.email.type}
                onChange={(evt) => onFormChange(evt, formObject.email.type)}
                onBlur={() => checkValidation(formObject.email.type)}
                error={!formObject.email.valid}
              />

              <Form.Input
                label={formObject.password.label}
                type={formObject.password.type}
                onChange={(evt) => onFormChange(evt, formObject.password.type)}
                onBlur={() => checkValidation(formObject.password.type)}
                error={!formObject.password.valid}
              />

              <Form.Button type={'submit'}>Log in</Form.Button>

              <Form.Button
                type={'button'}
                basic
                color={'red'}
                onClick={() => sendTo(ROUTES.NEW_USER)}
              >
                Or you can Sign up
              </Form.Button>

              {hasErrors && renderErrorMsg()}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LoginForm
