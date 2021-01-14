import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// SEMANTIC REACT
import { Form, Grid, Segment, Header } from 'semantic-ui-react'
// CONSTANTS
import ROUTES from '../../constants/app-routes'
import API from '../../constants/api-routes'
// MODELS
import { newUserFormHeader } from '../../models/new-user-form'
// HELPERS
import { encryptPass } from '../../helpers/encrypt'
import { setLoggedUser } from '../../helpers/local-storage'

const baseForm = {
  name: null,
  lastName: null,
  userName: null,
  email: null,
  password: null,
  repeatPass: null,
}

const NewUserForm = () => {
  let history = useHistory()
  const [header] = useState(newUserFormHeader)
  const [formObject, setFormObject] = useState({ ...baseForm })
  const [loading, setLoading] = useState(false)

  const sendTo = (route) => history.push(route)

  const onFormChange = (evt, prop) => {
    const { value } = evt.target
    setFormObject({
      ...formObject,
      [prop]: value !== '' ? value : null,
    })
  }

  const onSubmitCreation = async () => {
    setLoading(true)

    try {
      const payload = {
        name: formObject.name,
        lastName: formObject.lastName,
        email: formObject.email,
        password: encryptPass(formObject.password),
      }
      const { data } = await axios.post(API.NEW_USER, payload)

      setLoggedUser({
        token: data.token,
        ...data.newUser,
      })
      history.push(ROUTES.HOME)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header as="h1" textAlign={header.align}>
        {header.header}
      </Header>

      <Grid centered>
        <Grid.Column width={8} className="form-column">
          <Segment>
            <Form onSubmit={() => onSubmitCreation()} loading={loading}>
              <Form.Input
                label={'Name'}
                type={'text'}
                onChange={(evt) => onFormChange(evt, 'name')}
              />

              <Form.Input
                label={'Last Name'}
                type={'text'}
                onChange={(evt) => onFormChange(evt, 'lastName')}
              />

              <Form.Input
                label={'Username'}
                type={'text'}
                onChange={(evt) => onFormChange(evt, 'userName')}
              />

              <Form.Input
                label={'Email'}
                type={'mail'}
                onChange={(evt) => onFormChange(evt, 'email')}
              />

              <Form.Input
                label={'Password'}
                type={'password'}
                onChange={(evt) => onFormChange(evt, 'password')}
              />

              {/* <Form.Input
                label={'Repeat Password'}
                type={'password'}
                onChange={(evt) => onFormChange(evt, 'repeatPass')}
              /> */}

              <Form.Button type={'submit'}>Sign up</Form.Button>

              <Form.Button type={'button'} basic color={'red'} onClick={() => sendTo(ROUTES.LOGIN)}>
                Or you can log in with your account
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default NewUserForm
