import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// SEMANTIC REACT
import { Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
// API
import USERSAPI from '../../api/users.api'
// MODELS
import { loginFormBase, loginFormHeader } from '../../models/login-form'
// CONSTANTS
import ROUTES from '../../constants/app-routes'
// HELPERS
import { encryptPass } from '../../helpers/encrypt'
import { getLoggedUser, setLoggedUser } from '../../helpers/local-storage'
import { checkFormValidation } from '../../helpers/methods'

const LoginForm = () => {
  let history = useHistory()
  const [loggedUser] = useState(getLoggedUser())
  const [header] = useState(loginFormHeader)
  const [formObject, setFormObject] = useState({ ...loginFormBase })
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

  const onSubmitForm = async () => {
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
                onClick={() => history.push(ROUTES.NEW_USER)}
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
