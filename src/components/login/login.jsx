import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import * as CryptoJS from 'crypto-js'
// SEMANTIC REACT
import { Form, Grid, Header, Segment } from 'semantic-ui-react'
// CONSTANTS
import API from '../../consts/api-routes'
import ROUTES from '../../consts/app-routes'
// HELPERS
import { setLoggedUser } from '../../helpers/local-storage'

const baseForm = {
  email: null,
  password: null,
}

const Login = () => {
  let history = useHistory()
  const homeText = {
    header: 'Welcome to My Pets',
    subHeader: 'What whould you like to do?',
  }
  const sendTo = (route) => history.push(route)
  const [formObject, setFormObject] = useState({ ...baseForm })
  const [loading, setLoading] = useState(false)

  const onFormChange = (evt, prop) => {
    const { value } = evt.target
    setFormObject({
      ...formObject,
      [prop]: value !== '' ? value : null,
    })
  }

  const onSubmitForm = async () => {
    if (formObject.email === '' || formObject.password === '') {
      return
    }
    setLoading(true)

    const { REACT_APP_CRYPT_METH, REACT_APP_CRYPT_SECRET } = process.env
    const payload = {
      email: formObject.email,
      password: CryptoJS[REACT_APP_CRYPT_METH].encrypt(
        formObject.password,
        REACT_APP_CRYPT_SECRET
      ).toString(),
    }

    try {
      const { data } = await axios.post(API.LOGIN, payload)

      setLoggedUser({
        token: data.token,
        ...data.userLogged,
      })
      sendTo(ROUTES.HOME)
    } catch (e) {
      console.warn('e', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header as="h1" textAlign="center">
        {homeText.header}
        <Header.Subheader>{homeText.subHeader}</Header.Subheader>
      </Header>

      <Grid centered>
        <Grid.Column width={8}>
          <Segment>
            <Form onSubmit={() => onSubmitForm()} loading={loading}>
              <Form.Input
                label={'Email'}
                type={'email'}
                onChange={(evt) => onFormChange(evt, 'email')}
              />

              <Form.Input
                label={'Password'}
                type={'password'}
                onChange={(evt) => onFormChange(evt, 'password')}
              />

              <Form.Button type={'submit'}>Log in</Form.Button>
              <Form.Button
                type={'button'}
                basic
                color={'red'}
                onClick={() => sendTo(ROUTES.NEW_USER)}
              >
                Or you can sign in
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Login
