import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// SEMANTIC REACT
import { Form, Grid, Segment, Header, Message } from 'semantic-ui-react'
// API
import USERSAPI from '../../api/users.api'
// MODELS
import { newUserFormBase, newUserFormHeader } from '../../models/new-user-form'
// CONSTANTS
import ROUTES from '../../constants/app-routes'
// HELPERS
import { encryptPass } from '../../helpers/encrypt'
import { setLoggedUser } from '../../helpers/local-storage'
import { checkFormValidation } from '../../helpers/methods'

const NewUserForm = () => {
  let history = useHistory()
  const header = useState(newUserFormHeader)
  const [formObject, setFormObject] = useState({ ...newUserFormBase })
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setHasErrors(!checkFormValidation(formObject))
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

  const onSubmitCreation = async () => {
    if (hasErrors) {
      return
    }

    setLoading(true)

    const payload = {
      name: formObject.name.value,
      lastName: formObject.lastName.value,
      email: formObject.email.value,
      password: encryptPass(formObject.password.value),
    }
    const { data, message } = await USERSAPI.CREATE(payload)

    setLoading(false)

    if (data) {
      setLoggedUser({
        token: data.token,
        ...data.newUser,
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
      </Header>

      <Grid centered>
        <Grid.Column width={8} className="form-column">
          <Segment>
            <Form error={hasErrors} loading={loading} onSubmit={() => onSubmitCreation()}>
              <Form.Input
                label={formObject.name.label}
                type={formObject.name.type}
                onChange={(evt) => onFormChange(evt, formObject.name.control)}
                onBlur={() => checkValidation(formObject.name.control)}
                error={!formObject.name.valid}
              />

              <Form.Input
                label={formObject.lastName.label}
                type={formObject.lastName.type}
                onChange={(evt) => onFormChange(evt, formObject.lastName.control)}
                onBlur={() => checkValidation(formObject.lastName.control)}
                error={!formObject.lastName.valid}
              />

              <Form.Input
                label={formObject.userName.label}
                type={formObject.userName.type}
                onChange={(evt) => onFormChange(evt, formObject.userName.control)}
                onBlur={() => checkValidation(formObject.userName.control)}
                error={!formObject.userName.valid}
              />

              <Form.Input
                label={formObject.email.label}
                type={formObject.email.type}
                onChange={(evt) => onFormChange(evt, formObject.email.control)}
                onBlur={() => checkValidation(formObject.email.control)}
                error={!formObject.email.valid}
              />

              <Form.Input
                label={formObject.password.label}
                type={formObject.password.type}
                onChange={(evt) => onFormChange(evt, formObject.password.control)}
                onBlur={() => checkValidation(formObject.password.control)}
                error={!formObject.password.valid}
              />

              {/* <Form.Input
                label={'Repeat Password'}
                type={'password'}
                onChange={(evt) => onFormChange(evt, 'repeatPass')}
              /> */}

              <Form.Button type={'submit'}>Sign up</Form.Button>

              <Form.Button
                type={'button'}
                basic
                color={'red'}
                onClick={() => history.push(ROUTES.LOGIN)}
              >
                Or you can log in with your account
              </Form.Button>

              {hasErrors && renderErrorMsg()}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default NewUserForm
